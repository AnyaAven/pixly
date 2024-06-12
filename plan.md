
## STEPS




## FUTURE FEATURES
multer can have multiple files uploaded
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



## S3 AWS

Here's what I get back with 1 image uploaded directly to my pixly-anya bucket for pianos.jpg:

``` json
Success {
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
      ETag: '"ea08504317afe7c98bdc83aa26ddf540"',
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