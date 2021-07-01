const express = require('express');

// Load video API controllers
const { videoController: controller } = require('../controllers');

/*

API: HOST:PORT/videos/*

*/

const router = express.Router();

// Request list of videos
router.get('/', controller.getVideoList);

// Request for info on a particular video
router.get('/:id', controller.getVideoInfo);

// Request for a particular video
router.get('/video/:id', controller.getVideo);

// Save uploaded videos
router.post('/upload', controller.saveVideo);


module.exports = router;