
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