const path = require('path');
const ds = require("../services/ds.service");
const aws = require("../services/aws.service");

const assets = process.env.WORKDIR+process.env.ASSETS;
const dirT = `${assets}/transcripts/`;
const dirV = `${assets}/videos/`;

// Returns the captions for the specified video
const getTranscript = async (req, res, next) => {
  const videoId = req.params.id;
  const text = videoId.replace(".mp4",".txt");
  return res.sendFile(dirT + text);
}

const awsTranscribe = async (req, res, next) => {
  const videoId = req.params.id;
  console.log("Calling AWS and storing transcripts for:" + videoId);
  // Code for AWS
  aws.uploadFileToS3(dirV+videoId,process.env.S3_AUDIO_BUCKET);

  return res.writeHead(200, {'Content-Type': 'text/plain'})
}

const dsTranscribe = async (req, res, next) => {
  const videoId = req.params.id;
  console.log("Calling DS and storing transcripts for:" + videoId);
  
  // Code for DeepSpeech
  const text = ds.executeDeepSpeech(videoId);
  console.log("Transcript:",text);

  return res.writeHead(200, {'Content-Type': 'text/plain'})
}

module.exports = {
  getTranscript,
  awsTranscribe,
  dsTranscribe
};