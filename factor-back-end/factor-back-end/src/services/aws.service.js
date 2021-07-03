const AWS = require('aws-sdk');
const fs = require("fs");
var path = require('path');

const uploadFileToS3 = async (fileId, bucketName) =>{

    const BUCKET = bucketName;
    const REGION = process.env.AWS_REGION;

    // Set AWS region and credentials
    const awsConfig = {
        region: REGION,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    };

    // Initialize S3 bucket
    const s3 = new AWS.S3(awsConfig);

    const bucketConfig = {
        Bucket: BUCKET
    };

    // Create S3 Bucket if not exists
    s3.waitFor('bucketNotExists', bucketConfig, function(err, data) {
        if (err) console.log("Bucket already exists"); // an error occurred
        else{
            s3.createBucket(bucketConfig, function(err, data) {
                if (err) console.log(err, err.stack);
                else console.log('Bucket Created Successfully', data.Location);
            });
        }     
    });


    // Load audio file

    const fileStream = fs.createReadStream(fileId);
    
    fileStream.on('error', function(err) {
        console.log('File Error', err);
    });

    // Configure S3 upload parameters
    
    let s3UploadParams = {
        Bucket: BUCKET, 
        Key: path.basename(fileId), 
        Body: fileStream
    };

    // Upload file to specified S3 bucket
    s3.upload (s3UploadParams, function (err, data) {
        if (err) {
            console.log("Error", err);
        } 
        if (data) {
            console.log("Upload Success", data.Location);
        }
    });
}

module.exports = {
    uploadFileToS3
};