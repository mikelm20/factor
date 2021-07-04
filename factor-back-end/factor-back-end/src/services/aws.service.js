const AWS = require('aws-sdk');
const fs = require("fs");
var path = require('path');
const REGION = process.env.AWS_REGION;

// Set AWS region and credentials
const awsConfig = {
    region: REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
};

const uploadFileToS3 = async (fileId, bucketName) =>{

    const BUCKET = bucketName;

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

const transcribeS3Video = (videoId, bucketName) => {
    console.log("Transcribing video:", videoId);
    const transcribe = new AWS.TranscribeService(awsConfig);
    const transcriptionConfig = {
			LanguageCode: 'en-US',
			Media: {MediaFileUri: `https://${bucketName}.s3.amazonaws.com/${videoId}`},
			MediaFormat: 'mp4',
			TranscriptionJobName: "job-"+videoId,
			OutputBucketName: bucketName
	  	};
    transcribe.startTranscriptionJob(transcriptionConfig, function (err, data) {
	        if (err) {
	            console.log(err, err.stack);
	            reject(err);
	        }
	        else {
                console.log("Transcription started successfully!");
	        }
	    });
}

module.exports = {
    uploadFileToS3,
    transcribeS3Video
};