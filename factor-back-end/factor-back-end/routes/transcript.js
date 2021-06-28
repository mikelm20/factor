const express = require('express');

// Load video API controllers
const { transcriptController: controller } = require('../controllers');

/*

API: HOST:PORT/caption/*

*/

const router = express.Router();

// Request for captions of a particular video
router.get('/transcript/:id', controller.getTranscript);

module.exports = router;