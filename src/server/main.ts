import { NotFoundError } from "./expressError.js";
import dotenv from 'dotenv';
dotenv.config();

import { Router } from "express";
import express from "express";
import ViteExpress from "vite-express";
import bodyParser from "body-parser";

import {
  S3Client,
  ListObjectsCommand,
} from "@aws-sdk/client-s3";

const s3Client = new S3Client(
  {
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY || 'WRONG KEY',
      secretAccessKey: process.env.AWS_SECRET || 'WRONG SECRET'
    }
  }
);

/** ATTEMPT */
async function listObjectsInBucket(bucketName: string) {

  try {
    const data = await s3Client.send(new ListObjectsCommand({ Bucket: bucketName }));
    console.log("Success", data);
    return data;
  } catch (err) {
    console.log("Error", err);
    return err;
  }
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
  //const data = await listObjectsInBucket("pixly-anya");
  return res.json({ "KEY": "VALUE" });
});

app.use("/", router);

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  throw new NotFoundError();
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err: any, req: any, res: any, next: any) { // <-- TODO add typing
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  /* istanbul ignore next (ignore for coverage) */
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

export { app };
