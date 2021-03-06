const AWS = require('aws-sdk');

// Enter copied or downloaded access ID and secret key here
const ID = process.env.AWS_ACCESS_KEY_ID;
const SECRET = process.env.AWS_SECRET_ACCESS_KEY;

// The name of the bucket that you have created
export const BUCKET_NAME = 'useravatarsbucket';

export const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET,

});
