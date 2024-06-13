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

## LEARNING
If you want ts to ignore checking, use:
  //@ts-nocheck


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