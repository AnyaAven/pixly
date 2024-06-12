
import ExifImage  from "exif";
import { BadRequestError } from "expressError.js";

import fs from 'fs';

/** get height and width meta data from image filepath */
export function getWidthAndHeight(imageFilePath: string)
: {width: number | undefined, height: number | undefined}{

  let width: number | undefined;
  let height: number | undefined;
  try {
    ExifImage(imageFilePath ,
    function (error, exifData) {
      if (error){
        throw new BadRequestError("Could not process meta data")
      }
      else{
        width = exifData.image.ImageWidth;
        height = exifData.image.ImageHeight;
      }
    });
  } catch (error: any) {
    throw new BadRequestError("Could not run ExifImage")
  }

  return {width, height}
}

/** remove file by path */
export function removeFile(filePath: string): void{
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error('Error deleting file:', err);
    } else {
      console.log(`File deleted. Path: ${filePath}`);
    }
  });
}