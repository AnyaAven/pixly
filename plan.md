# Stack

DB: postgresQL
ORM: typeorm
FE: React typescript
BE: Express typescript


## STEPS





## FUTURE FEATURES

- postgresQL full text
https://stackoverflow.com/questions/59849262/postgresql-full-text-search-with-typeorm

- multer can have multiple files uploaded
https://github.com/expressjs/multer
    -.array(fieldname[, maxCount])
Accept an array of files, all with the name fieldname. Optionally error out if more than maxCount files are uploaded. The array of files will be stored in req.files.

## TODOS:
1. multer:
    Specifying the limits can help protect your site against denial of service (DoS) attacks.

        limits - object - Various limits on incoming data. Valid properties are:

fieldNameSize - integer - Max field name size (in bytes). Default: 100.

fieldSize - integer - Max field value size (in bytes). Default: 1048576 (1MB).

fields - integer - Max number of non-file fields. Default: Infinity.

*fileSize* - integer - For multipart forms, the max file size (in bytes). Default: Infinity.

files - integer - For multipart forms, the max number of file fields. Default: Infinity.

parts - integer - For multipart forms, the max number of parts (fields + files). Default: Infinity.

headerPairs - integer - For multipart forms, the max number of header key-value pairs to parse. Default: 2000 (same as node's http module).

2. update json schemas orientation to only be "landscape" or "portriat"
  - update to have description and comment but that it's not required

3. Make sure to ALWAYS remove temp files from /uploads

4. instead of fetching for ImageEditor
  41
https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
Following is my TypeScript code which can be converted easily into JavaScript and you can use

5. Fix ImageEditor

THIS ONE WORKS but I'd not like to fetch. Use the stackoverflow
```

          <ImagePickerEditor
              key={formData.filename} // <---TODO: figure out what key I want to change when it changes to create a new instance
              config={{ borderRadius: '8px' }}

              imageChanged={(editedImage) => {
                console.log("Edited image URL:", editedImage);
                fetch(editedImage)
                  .then(res => {
                    console.log("FIRST THEN");
                    return res.blob()
                  })
                  .then(blob => {
                    console.log("Fetched blob:", blob);
                    const editedFile = new File([blob], "name", { type: blob.type });
                    console.log("Edited file:", editedFile);
                    setFormData({ ...formData, uploadedFile: editedFile });
                  });
              }}
            />

```
/**
 * Convert BASE64 to BLOB
 * @param base64Image Pass Base64 image data to convert into the BLOB
 */
private convertBase64ToBlob(base64Image: string) {
  // Split into two parts
  const parts = base64Image.split(';base64,');

  // Hold the content type
  const imageType = parts[0].split(':')[1];

  // Decode Base64 string
  const decodedData = window.atob(parts[1]);

  // Create UNIT8ARRAY of size same as row data length
  const uInt8Array = new Uint8Array(decodedData.length);

  // Insert all character code into uInt8Array
  for (let i = 0; i < decodedData.length; ++i) {
    uInt8Array[i] = decodedData.charCodeAt(i);
  }

  // Return BLOB image after conversion
  return new Blob([uInt8Array], { type: imageType });
}

6. Fix content type to send formdata multi vs sending json

7. Split out the package.json to FE and BE

8. tsconfig.json

## LEARNING
If you want ts to ignore checking, use:
  //@ts-nocheck

If working with an external package component and they don't have it typed
explain in depth what your experience with the types are in docstrings and have the type of unknown


### TYPEORM
Use command `typeorm:sync`
fixed issue with sync:
https://github.com/typeorm/typeorm/issues/9738

to query one or fail
``` ts
const image = await Image.findOneOrFail({where: {id: 1}})
```
to get all
``` ts
const images = await Image.find(
    {select: {
      id: true,
      filename: true,
      height: true,
      width: true,
    }}
  )
```

## EXIF Data
image: make, model,
could store the raw string
  - or can have json column type too

``` json
{
  exifData: {
    image: {
      ImageWidth: 4000,
      ImageHeight: 2252,
      Make: 'samsung',
      Model: 'SM-N986U',
      Orientation: 1,
      XResolution: 72,
      YResolution: 72,
      ResolutionUnit: 2,
      Software: 'N986USQU2DUF2',
      ModifyDate: '2021:08:12 23:00:54',
      YCbCrPositioning: 1,
      ExifOffset: 238,
      GPSInfo: 696
    },
    thumbnail: {
      ImageWidth: 512,
      ImageHeight: 288,
      Compression: 6,
      XResolution: 72,
      YResolution: 72,
      ResolutionUnit: 2,
      ThumbnailOffset: 916,
      ThumbnailLength: 37775
    },
    exif: {
      ExposureTime: 0.008403361344537815,
      FNumber: 1.8,
      ExposureProgram: 2,
      ISO: 320,
      ExifVersion: <Buffer 30 32 32 30>,
      DateTimeOriginal: '2021:08:12 23:00:54',
      CreateDate: '2021:08:12 23:00:54',
      ShutterSpeedValue: 0.008403361344537815,
      ApertureValue: 1.69,
      BrightnessValue: 4.83,
      ExposureCompensation: 0,
      MaxApertureValue: 1.69,
      MeteringMode: 2,
      Flash: 0,
      FocalLength: 7,
      ColorSpace: 1,
      ExifImageWidth: 4000,
      ExifImageHeight: 2252,
      ExposureMode: 0,
      WhiteBalance: 0,
      DigitalZoomRatio: 1,
      FocalLengthIn35mmFormat: 25,
      SceneCaptureType: 0,
      ImageUniqueID: 'VA8XLNA00SM'
    },
    gps: {
      GPSLatitudeRef: 'N',
      GPSLatitude: [Array],
      GPSLongitudeRef: 'W',
      GPSLongitude: [Array]
    },
    interoperability: {},
    makernote: {}
  }
}

```

## S3 AWS

### BUGS
1. POSSIBLE FIX?: Could not access items in the bucket because the resource in the policy was only access the bucket not <bucket>/* <-- everything in the bucket

Here's what I get back with 1 image uploaded directly to my pixly-anya bucket for pianos.jpg:

``` json
{
  '$metadata': {
    httpStatusCode: 200,
    requestId: 'WPYFKXS31J48WAS6',
    extendedRequestId: 'oZausVTKAD2ez7JVh/A7+A63pNwec/D34HjbUiM5yFvvTSGidGujUjoRXrxvwmlI2TLKXVWhgBvJzAzMRBi33qUUZxyd7UwVuF4vuOFXw3k=',
    cfId: undefined,
    attempts: 1,
    totalRetryDelay: 0
  },
  Contents: [
    {
      Key: 'pianos.jpg',
      LastModified: 2024-06-11T22:11:01.000Z,
      ETag: "ea08504317afe7c98bdc83aa26ddf540",
      Size: 2126062,
      StorageClass: 'STANDARD',
      Owner: [Object]
    }
  ],
  IsTruncated: false,
  Marker: '',
  MaxKeys: 1000,
  Name: 'pixly-anya',
  Prefix: ''
}
```

UPLOAD ROUTE
``` json
{
  uploadParams: {
    Bucket: 'pixly-anya',
    Key: 'canvas-bag.jpg',
    Body: ReadStream {
      fd: null,
      path: 'uploads/15cce0ec234b93efff967138b758210b',
      flags: 'r',
      mode: 438,
      start: undefined,
      end: Infinity,
      pos: undefined,
      bytesRead: 0,
      _events: [Object],
      _readableState: [ReadableState],
      _maxListeners: undefined,
      _eventsCount: 1,
      [Symbol(kFs)]: [Object],
      [Symbol(kIsPerformingIO)]: false,
      [Symbol(shapeMode)]: true,
      [Symbol(kCapture)]: false
    },
    ContentType: 'image/jpeg'
  }
}
Success PUT {
  '$metadata': {
    httpStatusCode: 200,
    requestId: '06X39J2TV57AGSNN',
    extendedRequestId: 'QdvCHipmRRKZnNs9DS1Zm5Fkyc1ZH7RuvCUeHPiaXDvGYIOOnussFOEVjgJyWnVh7gIXVXCkFxA=',
    cfId: undefined,
    attempts: 1,
    totalRetryDelay: 0
  },
  ETag: '"8f83fc3e3ad8cebf5ed9f3db3d55e716"',
  ServerSideEncryption: 'AES256'
}
```