import { NotFoundError } from "./expressError.js";
import dotenv from 'dotenv';
dotenv.config();

import { Router } from "express";
import express from "express";
import ViteExpress from "vite-express";
import bodyParser from "body-parser";

import {
  S3Client,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

import multer from "multer"
import fs from 'fs';

const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME || "WRONG BUCKET NAME"

/** AWS s3 client for bucket */
const s3Client = new S3Client(
  {
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY || 'WRONG KEY',
      secretAccessKey: process.env.AWS_SECRET || 'WRONG SECRET'
    }
  }
);

/** PUT OBJECTS IN BUCKET */
async function putObjectInBucket(bucketName: string, Key: string){
  // try {
    const data = await s3Client.send(new PutObjectCommand(
      { Bucket: bucketName, Key, Body: "heres the body" }));
    console.log("Success PUT", data);
    return data;

  // } catch (err) {
  //   console.log("Error", err);
  //   return err;
  // }
}


const app = express();
app.use(bodyParser.json());
app.use(ViteExpress.static());

const port = Number(process.env.PORT) || 3000;

const server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});

ViteExpress.bind(app, server);

const router: Router = new (Router as any)(); // <-- TODO Research later a better solve



/** TEST HOME */
router.get("/", async function (req, res, next) {
  //const resp = await putObjectInBucket(AWS_BUCKET_NAME, "new-key");
  // const respStr = await resp.ContentLength
  // console.log({respStr})

  return res.json({ "KEY": "HOME VALUE" });
});

const upload = multer({ dest: 'uploads/' });

//https://github.com/expressjs/multer
/** TEST ROUTE TO UPLOAD AN IMG
 *
 * Middleware: upload.single("NAME FIELD"):
 * It is important that you use the name field value from the form in your upload function.
 * This tells multer which field on the request it should look for the files in.
 * If these fields aren't the same in the HTML form and on your server, your upload will fail:
*/
router.post('/upload', upload.single('uploaded_file'), async (req, res) => {
  console.log("UPLOAD ROUTE");
  if (!req.file) {
    return res.status(400).send({ error: 'No file uploaded' });
  }
  // req.body will hold the text fields, if there were any

  const file = req.file;
  const filePath = file.path;

  //https://www.geeksforgeeks.org/node-js-fs-createreadstream-method/
  //https://www.geeksforgeeks.org/difference-between-readfile-and-createreadstream-in-node-js/
  const fileStream = fs.createReadStream(filePath);

  const uploadParams = {
    Bucket: AWS_BUCKET_NAME,
    Key: `${file.originalname}`, //TODO: PUT AS A KEY FROM DB
    Body: fileStream,
    ContentType: file.mimetype,
  };

  console.log({uploadParams})
  try {
    const data = await s3Client.send(new PutObjectCommand(uploadParams));
    console.log('Success PUT', data);
    res.status(200).send({ message: 'File uploaded successfully', data });

    // Delete the temporary file
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting temporary file:', err);
      } else {
        console.log('Temporary file deleted');
      }
    });
  } catch (err: any) {
    console.error('Error uploading file:', err);
    res.status(500).send({ error: err.message });

    // Delete the temporary file in case of error
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting temporary file:', err);
      } else {
        console.log('Temporary file deleted');
      }
    });
  }

  return res.json({success: uploadParams})
});

app.use("/", router);

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  throw new NotFoundError();
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err: any, req: any, res: any, next: any) { // <-- TODO add typing
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

export { app };
