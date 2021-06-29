const path = require('path');

// Returns the captions for the specified video
const getTranscript = async (req, res, next) => {
  const videoId = req.params.id;
  const text = videoId.replace(".mp4",".txt");
  return res.sendFile(path.resolve(__dirname, `../assets/transcripts/${text}`));
}

const makeTranscript = async (req, res, next) => {
  const videoId = req.params.id;
  console.log("Calling "+req.params.api+" and storing transcripts for:" + videoId);
  return res.writeHead(200, {'Content-Type': 'text/plain'})
}

module.exports = {
  getTranscript,
  makeTranscript
};