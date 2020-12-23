const getUploadURL = async () => {
  let requestObject = JSON.parse(event["body"]);
  let fileName = requestObject.file;
  //let fileType = requestObject.fileType;
  const myBucket = 'council-tax-upload-ons';
  const randomId = parseInt(Math.random() * 10000000)
  
  const s3Params = {
    Bucket: $myBucket,
    Key:  `${fileName}-${randomId}.csv`,
    ContentType: 'text/csv',
    Expires: 60,
    ACL: 'public-read'
  }
  return new Promise((resolve, reject) => {
    let uploadURL = s3.getSignedUrl('putObject', s3Params)
    resolve({
      "statusCode": 200,
      "isBase64Encoded": false,
      "headers": { 'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
         },
      "body": JSON.stringify({
        "uploadURL": uploadURL,
        "fileName": `${fileName}-${randomId}.csv`
      })
    })
  })
};
