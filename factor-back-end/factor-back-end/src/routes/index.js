const express = require('express');
const router = express.Router();
const videos = require('./videos');
const transcripts = require('./transcript');

//  Videos API (HOST:PORT/videos)
router.use('/videos', videos);
router.use('/transcripts', transcripts);

module.exports = router;
