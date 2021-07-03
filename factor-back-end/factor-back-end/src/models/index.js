const mongoose = require('mongoose');
const VideoModel = require('./video.db');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {console.log('[MONGODB]: MongoDB Connected')})
  .catch(error => {console.log('[MONGODB]:', error)});

module.exports = {
  VideoModel
};
