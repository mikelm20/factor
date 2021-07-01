const path = require('path');
const ds = require("../services/ds.service");

// Returns the captions for the specified video
const getTranscript = async (req, res, next) => {
  const videoId = req.params.id;
  const text = videoId.replace(".mp4",".txt");
  return res.sendFile(path.resolve(__dirname, `../assets/transcripts/${text}`));
}

const awsTranscript = async (req, res, next) => {
  const videoId = req.params.id;
  console.log("Calling AWS and storing transcripts for:" + videoId);
  // Code for AWS



  return res.writeHead(200, {'Content-Type': 'text/plain'})
}

const dsTranscript = async (req, res, next) => {
  const videoId = req.params.id;
  console.log("Calling DS and storing transcripts for:" + videoId);
  // Code for DeepSpeech
  const text = ds.executeDeepSpeech(path.resolve(__dirname, `../assets/${videoId}`));
  console.log("Transcript:",text);
  
  //deepSpeech(path.resolve(__dirname, `../assets/${videoId}`)); //Node and Electron version mismatch

  return res.writeHead(200, {'Content-Type': 'text/plain'})
}

module.exports = {
  getTranscript,
  awsTranscript,
  dsTranscript
};