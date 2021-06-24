const fs = require('fs');
const path = require('path');
const formidable = require("formidable");
const {VideoModel: Video} = require('../models');

const saveVideo = async (req, res, next) => {
  try {
    //Set database directory
    let form = formidable({
        uploadDir: "assets"
    });

    //Parse Request Body And Save Files By Random Name In "uploadDir"
    form.parse(req,(error, fields, files) => {
        
      //Rename Files After Saving them
      //files.file.path = Random formidable name
      //files.file.name = formData key value pair: original file name
      let newFilePath = `../assets/${Date.now()}_${files.file.name.replace(new RegExp(' ','g'),'_')}`;
      fs.renameSync(path.join(path.resolve(__dirname,`../`), files.file.path), path.join(__dirname, newFilePath));

      // Create a doc with the video info
      const newVideo = new Video({
        email: "martin@gmail.com", //The owner of the video
        name: files.file.name, //The name of the video
        filePath: newFilePath, //The path to the video
        transcriptPath: [{ API: "AWS", textPath: path.resolve(__dirname, `../assets/captions/${files.file.name}.vtt`)}], // The name and path to each transcript.

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
const sendVideo = async (req, res, next) => {
  try {
    const videoPath = path.resolve(__dirname, `../assets/${req.params.id}.mp4`);
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

// Returns the captions for the specified video
const getCaption = async (req, res, next) => {
  return res.sendFile(path.resolve(__dirname, `../assets/captions/${req.params.id}.vtt`));
}

// Returns the info for the specified video
const getVideoInfo = async (req, res, next) => {
  const id = parseInt(req.params.id, 10)
  return res.json(videos[id])
}

module.exports = {
  saveVideo,
  sendVideo,
  getVideoList,
  getCaption,
  getVideoInfo
};