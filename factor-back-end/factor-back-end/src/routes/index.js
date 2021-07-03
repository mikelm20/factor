const express = require('express');
const router = express.Router();
const videos = require('./videos');
const transcripts = require('./transcript');

//   API => (HOST:PORT)

router.use('/videos', videos);
router.use('/transcripts', transcripts);

module.exports = router;
