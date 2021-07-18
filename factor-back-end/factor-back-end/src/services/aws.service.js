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
    return s3.upload (s3UploadParams, function (err, data) {
        if (err) {
            console.log("Error", err);
        } 
        if (data) {
            console.log("Upload Success", data.Location);
        }
    }).promise();
}

const transcribeS3Video = (videoId, bucketName) => {
    console.log("Transcribing video:", videoId);
    const job = videoId.replace(".mp4","")+"-transcription";
    const transcribe = new AWS.TranscribeService(awsConfig);
    const transcriptionConfig = {
        LanguageCode: 'en-US',
        Media: {MediaFileUri: `https://${bucketName}.s3.amazonaws.com/${videoId}`},
        MediaFormat: 'mp4',
        TranscriptionJobName: job,
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

const saveFileFromS3 = (newFile, s3File, bucketName) => {
    
    const BUCKET = bucketName;

    // Initialize S3 bucket
    const s3 = new AWS.S3(awsConfig);

    const bucketConfig = {
        Bucket: BUCKET,
        Key: s3File
    };

    s3.getObject(bucketConfig, function(err,data){
        if (err) {
           console.log("Failed to retrieve an object: " + err);
        } else {
            fs.writeFile(newFile, data.Body.toString(), function(err) {
                if (err) {
                    console.log(err);
                }
                else{
                    console.log("AWS transcript saved:", data.Body.toString());
                }
            });
        }
    });
}

module.exports = {
    uploadFileToS3,
    transcribeS3Video,
    saveFileFromS3
};

/*
{
    "jobName":"1_Trim_1626467646513-transcription",
    "accountId":"685606811069",
    "results":{
        "transcripts":[
            {"transcript":"Hi, my name is Michael Martin, and this is a quick demo of my restaurant manager application for i t. MD 5 10. We can begin by clicking the bottle in the start up screen here. You can either your role or to view the restaurant's menu. The admin role creates managers and the manager role creates menus. We're going to start."}
        ],
        "items":[
            {"start_time":"0.94",
            "end_time":"1.31",
            "alternatives":[
                {"confidence":"1.0","content":"Hi"}
            ],
            "type":"pronunciation"},
            {"alternatives":[
                {"confidence":"0.0","content":","}
            ],"type":"punctuation"},
            {"start_time":"1.32",
            "end_time":"1.5",
            "alternatives":[
                {"confidence":"1.0","content":"my"}
            ],
            "type":"pronunciation"},
            {"start_time":"1.5","end_time":"1.73","alternatives":[{"confidence":"1.0","content":"name"}],"type":"pronunciation"},{"start_time":"1.73","end_time":"1.89","alternatives":[{"confidence":"1.0","content":"is"}],"type":"pronunciation"},{"start_time":"1.89","end_time":"2.14","alternatives":[{"confidence":"0.975","content":"Michael"}],"type":"pronunciation"},{"start_time":"2.14","end_time":"2.76","alternatives":[{"confidence":"0.966","content":"Martin"}],"type":"pronunciation"},{"alternatives":[{"confidence":"0.0","content":","}],"type":"punctuation"},{"start_time":"2.77","end_time":"2.98","alternatives":[{"confidence":"1.0","content":"and"}],"type":"pronunciation"},{"start_time":"2.98","end_time":"3.17","alternatives":[{"confidence":"1.0","content":"this"}],"type":"pronunciation"},{"start_time":"3.17","end_time":"3.33","alternatives":[{"confidence":"1.0","content":"is"}],"type":"pronunciation"},{"start_time":"3.33","end_time":"3.42","alternatives":[{"confidence":"1.0","content":"a"}],"type":"pronunciation"},{"start_time":"3.42","end_time":"3.68","alternatives":[{"confidence":"1.0","content":"quick"}],"type":"pronunciation"},{"start_time":"3.68","end_time":"4.19","alternatives":[{"confidence":"0.992","content":"demo"}],"type":"pronunciation"},{"start_time":"4.2","end_time":"4.34","alternatives":[{"confidence":"0.97","content":"of"}],"type":"pronunciation"},{"start_time":"4.35","end_time":"4.49","alternatives":[{"confidence":"0.997","content":"my"}],"type":"pronunciation"},{"start_time":"4.49","end_time":"4.98","alternatives":[{"confidence":"1.0","content":"restaurant"}],"type":"pronunciation"},{"start_time":"4.98","end_time":"5.54","alternatives":[{"confidence":"1.0","content":"manager"}],"type":"pronunciation"},{"start_time":"5.54","end_time":"6.25","alternatives":[{"confidence":"1.0","content":"application"}],"type":"pronunciation"},{"start_time":"6.25","end_time":"6.82","alternatives":[{"confidence":"1.0","content":"for"}],"type":"pronunciation"},{"start_time":"6.83","end_time":"6.99","alternatives":[{"confidence":"0.911","content":"i"}],"type":"pronunciation"},{"start_time":"6.99","end_time":"7.19","alternatives":[{"confidence":"0.91","content":"t"}],"type":"pronunciation"},{"alternatives":[{"confidence":"0.0","content":"."}],"type":"punctuation"},{"start_time":"7.19","end_time":"7.64","alternatives":[{"confidence":"0.642","content":"MD"}],"type":"pronunciation"},{"start_time":"7.64","end_time":"7.98","alternatives":[{"confidence":"1.0","content":"5"}],"type":"pronunciation"},{"start_time":"7.98","end_time":"8.35","alternatives":[{"confidence":"1.0","content":"10"}],"type":"pronunciation"},{"alternatives":[{"confidence":"0.0","content":"."}],"type":"punctuation"},{"start_time":"9.41","end_time":"9.78","alternatives":[{"confidence":"1.0","content":"We"}],"type":"pronunciation"},{"start_time":"9.78","end_time":"9.96","alternatives":[{"confidence":"1.0","content":"can"}],"type":"pronunciation"},{"start_time":"9.96","end_time":"10.33","alternatives":[{"confidence":"1.0","content":"begin"}],"type":"pronunciation"},{"start_time":"10.33","end_time":"10.46","alternatives":[{"confidence":"0.909","content":"by"}],"type":"pronunciation"},{"start_time":"10.46","end_time":"10.82","alternatives":[{"confidence":"0.934","content":"clicking"}],"type":"pronunciation"},{"start_time":"10.82","end_time":"10.91","alternatives":[{"confidence":"1.0","content":"the"}],"type":"pronunciation"},{"start_time":"10.91","end_time":"11.24","alternatives":[{"confidence":"0.589","content":"bottle"}],"type":"pronunciation"},{"start_time":"11.24","end_time":"11.36","alternatives":[{"confidence":"0.977","content":"in"}],"type":"pronunciation"},{"start_time":"11.36","end_time":"11.45","alternatives":[{"confidence":"0.998","content":"the"}],"type":"pronunciation"},{"start_time":"11.45","end_time":"11.81","alternatives":[{"confidence":"0.977","content":"start"}],"type":"pronunciation"},{"start_time":"11.81","end_time":"11.92","alternatives":[{"confidence":"0.977","content":"up"}],"type":"pronunciation"},{"start_time":"11.92","end_time":"12.55","alternatives":[{"confidence":"1.0","content":"screen"}],"type":"pronunciation"},{"start_time":"13.64","end_time":"14.28","alternatives":[{"confidence":"1.0","content":"here"}],"type":"pronunciation"},{"alternatives":[{"confidence":"0.0","content":"."}],"type":"punctuation"},{"start_time":"14.29","end_time":"14.44","alternatives":[{"confidence":"1.0","content":"You"}],"type":"pronunciation"},{"start_time":"14.44","end_time":"14.7","alternatives":[{"confidence":"1.0","content":"can"}],"type":"pronunciation"},{"start_time":"14.71","end_time":"15.23","alternatives":[{"confidence":"1.0","content":"either"}],"type":"pronunciation"},{"start_time":"15.23","end_time":"15.55","alternatives":[{"confidence":"0.961","content":"your"}],"type":"pronunciation"},{"start_time":"15.55","end_time":"16.02","alternatives":[{"confidence":"0.953","content":"role"}],"type":"pronunciation"},{"start_time":"16.03","end_time":"17.03","alternatives":[{"confidence":"1.0","content":"or"}],"type":"pronunciation"},{"start_time":"17.04","end_time":"17.19","alternatives":[{"confidence":"0.968","content":"to"}],"type":"pronunciation"},{"start_time":"17.19","end_time":"17.42","alternatives":[{"confidence":"1.0","content":"view"}],"type":"pronunciation"},{"start_time":"17.42","end_time":"17.56","alternatives":[{"confidence":"1.0","content":"the"}],"type":"pronunciation"},{"start_time":"17.56","end_time":"18.04","alternatives":[{"confidence":"0.972","content":"restaurant's"}],"type":"pronunciation"},{"start_time":"18.04","end_time":"18.56","alternatives":[{"confidence":"1.0","content":"menu"}],"type":"pronunciation"},{"alternatives":[{"confidence":"0.0","content":"."}],"type":"punctuation"},{"start_time":"19.34","end_time":"19.51","alternatives":[{"confidence":"1.0","content":"The"}],"type":"pronunciation"},{"start_time":"19.51","end_time":"19.84","alternatives":[{"confidence":"1.0","content":"admin"}],"type":"pronunciation"},{"start_time":"19.84","end_time":"20.12","alternatives":[{"confidence":"0.991","content":"role"}],"type":"pronunciation"},{"start_time":"20.12","end_time":"20.47","alternatives":[{"confidence":"0.999","content":"creates"}],"type":"pronunciation"},{"start_time":"20.47","end_time":"21.18","alternatives":[{"confidence":"0.98","content":"managers"}],"type":"pronunciation"},{"start_time":"21.19","end_time":"21.43","alternatives":[{"confidence":"1.0","content":"and"}],"type":"pronunciation"},{"start_time":"21.43","end_time":"21.5","alternatives":[{"confidence":"1.0","content":"the"}],"type":"pronunciation"},{"start_time":"21.5","end_time":"21.94","alternatives":[{"confidence":"0.999","content":"manager"}],"type":"pronunciation"},{"start_time":"21.94","end_time":"22.36","alternatives":[{"confidence":"0.98","content":"role"}],"type":"pronunciation"},{"start_time":"22.74","end_time":"23.06","alternatives":[{"confidence":"0.86","content":"creates"}],"type":"pronunciation"},{"start_time":"23.06","end_time":"23.66","alternatives":[{"confidence":"0.991","content":"menus"}],"type":"pronunciation"},{"alternatives":[{"confidence":"0.0","content":"."}],"type":"punctuation"},{"start_time":"24.34","end_time":"24.51","alternatives":[{"confidence":"0.99","content":"We're"}],"type":"pronunciation"},{"start_time":"24.51","end_time":"24.75","alternatives":[{"confidence":"1.0","content":"going"}],"type":"pronunciation"},{"start_time":"24.75","end_time":"24.87","alternatives":[{"confidence":"1.0","content":"to"}],"type":"pronunciation"},{"start_time":"24.87","end_time":"25.53","alternatives":[{"confidence":"1.0","content":"start"}],"type":"pronunciation"},{"alternatives":[{"confidence":"0.0","content":"."}],"type":"punctuation"}]},
            "status":"COMPLETED"}


*/