const express = require('express');
const router = express.Router();
const videos = require('./videos');

//  Videos API (HOST:PORT/videos)
router.use('/videos', videos);

module.exports = router;
