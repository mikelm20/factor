const mongoose = require('mongoose');
const VideoModel = require('./video.db');

mongoose.connect("mongodb://factor-usr:REDACTED@127.0.0.1:27018/factor-dev", { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {console.log('[MONGODB]: MongoDB Connected')})
  .catch(error => {console.log('[MONGODB]:', error)});

module.exports = {
  VideoModel
};
