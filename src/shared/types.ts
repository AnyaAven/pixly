import fs from "fs"

/** Useful for PutObjectCommand from "@aws-sdk/client-s3" */
export type tUploadParamsAWS = {
  Bucket: string;
  Key: string;
  Body: fs.ReadStream;
  ContentType: string;
}