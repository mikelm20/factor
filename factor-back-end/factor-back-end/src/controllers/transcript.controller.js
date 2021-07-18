const path = require('path');
//Mozilla DeepSpeech
const ds = require("../services/ds.service");
//AWS Transcribe
const aws = require("../services/aws.service");
//IBM Watson
const ibm = require("../services/ibm.service");
//Google 
const gc = require("../services/gc.service");
//Azure
const az = require("../services/az.service");

const bucket = process.env.AWS_S3_AUDIO_BUCKET;
const assets = process.env.WORKDIR+process.env.ASSETS;
const dirT = `${assets}/transcripts/`;
const dirV = `${assets}/videos/`;

// Returns the captions for the specified video
const getTranscript = async (req, res, next) => {
  const videoId = req.params.id;
  const api = req.params.api;
  const text = videoId.replace(".mp4",".txt");
  if(api == "aws"){
    aws.saveFileFromS3(dirT+api+"/"+ text, videoId.replace(".mp4","")+"-transcription.json", bucket);
  }
  return res.sendFile(dirT+api+"/"+ text);
}

const awsTranscribe = async (req, res, next) => {
  const videoId = req.params.id;
  console.log("Calling AWS and storing transcripts for:" + videoId);
  
  // Code for AWS API
  aws.uploadFileToS3(dirV+videoId, bucket).then(()=>{
      aws.transcribeS3Video(videoId, bucket);
  });
  
  return res.writeHead(200, {'Content-Type': 'text/plain'})
}

const dsTranscribe = async (req, res, next) => {
  const videoId = req.params.id;
  console.log("Calling DS and storing transcripts for:" + videoId);
  
  // Code for DeepSpeech
  await ds.executeDeepSpeech(videoId);

  return res.writeHead(200, {'Content-Type': 'text/plain'})
}

const ibmTranscribe = async (req, res, next) => {
  const videoId = req.params.id;
  console.log("Calling IBM and storing transcripts for:" + videoId);
  
  // Code for IB API
  await ibm.transcribeIBM(videoId);

  return res.writeHead(200, {'Content-Type': 'text/plain'})
}

const gcTranscribe = async (req, res, next) => {
  const videoId = req.params.id;
  console.log("Calling Google and storing transcripts for:" + videoId);
  
  //Code for Google API
  await gc.gcTranscribe(videoId);

  return res.writeHead(200, {'Content-Type': 'text/plain'})
}

const azTranscribe = async (req, res, next) => {
  const videoId = req.params.id;
  console.log("Calling Azure and storing transcripts for:" + videoId);
  
  //Code for Google API
  await az.azTranscribe(videoId);

  return res.writeHead(200, {'Content-Type': 'text/plain'})
}

module.exports = {
  getTranscript,
  awsTranscribe,
  dsTranscribe,
  ibmTranscribe,
  gcTranscribe,
  azTranscribe
};