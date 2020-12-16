const getUploadURL = async (file) => {
  const randomId = parseInt(Math.random() * 10000000)
  const filename = file
  const s3Params = {
    Bucket: 'council-tax-upload-ons',
    Key:  `${filename}-${randomId}.csv`,
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
        "filename": `${filename}-${randomId}.csv`
      })
    })
  })
};