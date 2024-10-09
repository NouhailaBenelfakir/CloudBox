import AWS from 'aws-sdk';

export const uploadFile = (file) => {
  const s3 = new AWS.S3();
  const params = {
    Bucket: 'cloud-box-bucket', // Replace with your bucket name
    Key: file.name,
    Body: file,
    ContentType: file.type,
  };

  return s3.upload(params).promise(); // Returns a promise
};

export const deleteFile = (fileName) => {
  const s3 = new AWS.S3();
  const params = {
    Bucket: 'cloud-box-bucket', // Replace with your bucket name
    Key: fileName,
  };

  return s3.deleteObject(params).promise(); // Returns a promise
};
