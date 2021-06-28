const path = require('path');

// Returns the captions for the specified video
const getTranscript = async (req, res, next) => {
  const video = req.params.id;
  const text = video.replace(".mp4",".vtt")
  return res.sendFile(path.resolve(__dirname, `../assets/transcripts/${text}`));
}

module.exports = {
  getTranscript
};