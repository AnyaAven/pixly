/** Helper commands to interact with s3 AWS */
import { tUploadParamsAWS } from "@/shared/types.js";

import dotenv from 'dotenv';
dotenv.config();

import {
  S3Client,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { BadRequestError } from "expressError.js";

/** AWS s3 client for bucket */
const s3Client = new S3Client(
  {
    region: process.env.AWS_REGION || "WRONG REGION",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY || 'WRONG KEY',
      secretAccessKey: process.env.AWS_SECRET || 'WRONG SECRET'
    }
  }
);

export async function putObjectInBucket(uploadObject: tUploadParamsAWS){
  try {
    const data = await s3Client.send(new PutObjectCommand(uploadObject));
    console.log('Success put in AWS:', data);
    return data
  } catch (err: any) {
    throw new BadRequestError("Could not put object in AWS Bucket");
  };
}