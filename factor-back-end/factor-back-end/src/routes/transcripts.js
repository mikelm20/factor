const express = require('express');

// Load video API controllers
const { transcriptController: controller } = require('../controllers');

/*

API: HOST:PORT/transcripts/*

*/

const router = express.Router();

// Request for captions of a particular video
router.get('/transcript/:api/:id', controller.getTranscript);

router.get('/transcribe/aws/:id/', controller.awsTranscribe);

router.get('/transcribe/ds/:id/', controller.dsTranscribe);

router.get('/transcribe/ibm/:id/', controller.ibmTranscribe);

router.get('/transcribe/gc/:id/', controller.gcTranscribe);

router.get('/transcribe/az/:id/', controller.azTranscribe);


module.exports = router;