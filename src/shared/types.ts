import fs from "fs"

/** For database model */
export type tImageModel = {
  id: number,
  filename: string,
  height: number,
  width: number,
  orientation: "landscape" | "portrait",
  isEditted: boolean,
  description?: string,
  comment?: string,
}

/** Useful for PutObjectCommand from "@aws-sdk/client-s3" */
export type tUploadParamsAWS = {
  Bucket: string;
  Key: string;
  Body: fs.ReadStream;
  ContentType: string;
}

/** For uploading an Image in App */
export type tImageUpload = {
  uploadedFile: null | File;
  filename: string;
  description: string;
  comment: string;
  orientation: "landscape" | "portrait";
}

/** Generic HTTP methods */
export type tHTTPMethods =
"GET" |
"POST"