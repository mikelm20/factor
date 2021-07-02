const mongoose = require('mongoose');
const VideoModel = require('./video.db');

mongoose.connect("mongodb://factor-usr:REDACTED@database:27017/factor-dev", { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {console.log('[MONGODB]: MongoDB Connected')})
  .catch(error => {console.log('[MONGODB]:', error)});

module.exports = {
  VideoModel
};
