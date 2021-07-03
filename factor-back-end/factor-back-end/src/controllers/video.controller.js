const fs = require('fs');
const path = require('path');
const formidable = require("formidable");
const {VideoModel: Video} = require('../models');

const assets = process.env.WORKDIR+process.env.ASSETS;
const dirT = `${assets}/transcripts/`;
const dirV = `${assets}/videos/`;

const saveVideo = async (req, res, next) => {
  try {
    //Set database directory
    let form = formidable({
        uploadDir: dirV
    });

    //Parse Request Body And Save Files By Random Name In "uploadDir"
    form.parse(req,(error, fields, files) => {
        
      //Rename Files After Saving them
      //files.file.path = Random formidable name
      //files.file.name = formData key value pair: original file name
      let newName = `${Date.now()}_${files.file.name.replace(new RegExp(' ','g'),'_')}`;
      let newFilePath = dirV+newName;
      fs.renameSync(files.file.path, newFilePath);

      // Create a doc with the video info
      const newVideo = new Video({
        email: "martin@gmail.com", //The owner of the video
        name: newName, //The name of the video
        filePath: newFilePath, //The path to the video
        transcriptPath: [{ API: "DS", textPath: dirT+newName}], // The name and path to each transcript.

      });

      // Save the new video info in the database
      newVideo.save();

      //End Response
      return res.json("newFilePath");
    });
  } catch (error) {
    return next(error);
  }
};

// Returns the specified video in the request id
const getVideo = async (req, res, next) => {
  try {
    const videoPath = dirV+req.params.id;
    const videoStat = fs.statSync(videoPath);
    const fileSize = videoStat.size;
    const videoRange = req.headers.range;
    if (videoRange) {
        const parts = videoRange.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize-1;
        const chunksize = (end-start) + 1;
        const file = fs.createReadStream(videoPath, {start, end});
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        fs.createReadStream(videoPath).pipe(res);
        
    }
  } catch (error) {
    return next(error);
  }
};

// Returns the database video list specified in the "videos" const
const getVideoList = async (req, res, next) => {
  const doc = await Video.find();
  return res.json(doc);
}

// Returns the info for the specified video
const getVideoInfo = async (req, res, next) => {
  const id = parseInt(req.params.id, 10)
  return res.json(videos[id])
}

module.exports = {
  saveVideo,
  getVideo,
  getVideoList,
  getVideoInfo
};