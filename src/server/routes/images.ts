/** Routes for images. */
import dotenv from 'dotenv';
dotenv.config();
import { Router } from "express";
import { BadRequestError } from "../expressError.js";

import { Image } from "models/image.js";
import { AppDataSource } from "db/data-source.js";

import jsonschema from "jsonschema";
import imageUploadSchema from "../schemas/imageUploadSchema.json" with {type: "json"};

const router = Router();

import { getWidthAndHeight, removeFile } from "helpers/metadata.js";
import { putObjectInBucket } from "helpers/aws.js";

import multer from "multer";
import fs from 'fs';

const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME || "WRONG BUCKET NAME";
const upload = multer({ dest: 'tempUploads/' });

/** GET / => { images: [{
 *  id,
 *  filename,
 *  height,
 *  width,
 *  orientation,
 *  isEdited,
 *  description,
 *  comment},...]}
 *
 * Returns a list of all images in DB
 **/

router.get("/", async function (req, res, next) {
  const images = await Image.find(
    {
      select: {
        id: true,
        filename: true,
        height: true,
        width: true,
        orientation: true,
        isEdited: true,
        description: true,
        comment: true,
      }
    }
  );

  return res.json({ images });
});


/** GET / => { images: [{
 *  id,
 *  filename,
 *  height,
 *  width,
 *  orientation,
 *  isEdited,
 *  description,
 *  comment},...]}
 *
 * Returns a list of images filter by query string in DB
 *
 * Filter by words seperated by a space in the query string.
 * -> "inspire social"
 **/

router.get("/search", async function (req, res, next) {
  const queryCopy = req.query;
  console.log({ queryCopy });

  if(typeof queryCopy.q !== "string") {
    throw new BadRequestError("No query string provided")
  }
  const searchTerms =
    queryCopy
      .q?.trim().split(' ')
      .map(term => term.trim()).join(' & ');

  // :query with matching key of object

  //The @@ operator is used to compare a tsquery value (the query) with a
  // tsvector value (the document) to determine if the document matches the query.
  const imageRepository = AppDataSource.getRepository(Image);
  const images = await imageRepository
    .createQueryBuilder("image")
    .where("image.document_with_weights @@ to_tsquery(:query)",
      { query: searchTerms })
    .getMany();

  return res.json({ images, len: images.length });
});

/** POST / => Add a new Image to AWS and DB
 *
 * req.body fields must have a file, filename, and orientation.
 *
 * returns:
 * {image: {id,
 *  filename,
 *  height,
 *  width,
 *  orientation,
 *  isEdited,
 *  description,
 *  comment
 * }}
*/
router.post("/upload", upload.single('uploadedFile'),
  async function (req, res, next) {
    console.log("ROUTE: images/upload");

    if (!req.file) {
      throw new BadRequestError("No file uploaded");
    }

    const validator = jsonschema.validate(
      req.body,
      imageUploadSchema,
      { required: true },
    );
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs.join(""));
    }

    const filePath = req.file.path;
    const fileStream = fs.createReadStream(filePath);

    // // collect meta data
    // const {width, height} = getWidthAndHeight(filePath);

    // add new Image to DB
    const image = new Image();
    image.filename = req.body.filename;
    image.height = 0;// height ? height : 0;
    image.width = 0; //width ? width : 0;
    image.orientation = req.body.orientation;
    image.comment = req.body.comment || "";
    image.description = req.body.description || "";
    await image.save();
    console.log({ image });

    const uploadParams = {
      Bucket: AWS_BUCKET_NAME,
      Key: `${image.id}`,
      Body: fileStream,
      ContentType: req.file.mimetype,
    };
    console.log({ uploadParams });
    await putObjectInBucket(uploadParams);

    // remove temp file
    removeFile(filePath);

    return res.status(201).json({ image });
  });


export default router;