const AWS = require('aws-sdk');

// Enter copied or downloaded access ID and secret key here
const ID = process.env.S3_ID;
const SECRET = process.env.S3_SECRET;

// The name of the bucket that you have created
export const BUCKET_NAME = 'useravatarsbucket';

export const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET,

});
