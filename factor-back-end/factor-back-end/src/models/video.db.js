// Video.Model.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

// Create Schema
const videoSchema = new Schema({
    
    email: String, //The owner of the video
    name: String, //The name of the video
    filePath: String, //The path to the video
    transcriptPath: [{ API: String, textPath: String}], // The name and path to each transcript.
    date: { type: Date, default: Date.now } // Date created (automatic)

});

// Convert our schema into a Model
const Video = mongoose.model("Video", videoSchema);

// Export model
module.exports = Video;