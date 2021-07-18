// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');
const fs = require('fs');
var sox = require('sox');
const extractAudio = require('ffmpeg-extract-audio');

const assets = process.env.WORKDIR+process.env.ASSETS;
const dirT = `${assets}/transcripts/`;
const dirV = `${assets}/videos/`;
const dirA = `${assets}/audios/`;


const gcTranscribe = async (videoFile) => {

    const video = dirV+videoFile;
    const outputMP3 = dirA+videoFile.replace('.mp4','.mp3');
    const outputTxt = dirT+"gc/"+videoFile.replace('.mp4','.txt');
    
    // Creates a client
    const client = new speech.SpeechClient();

    // Extract audio from video
    console.log("Extracting audio from:",video);

    await extractAudio({
        input: video,
        output: outputMP3
    });

    console.log("Extracted");

    //Open audio
    const audio = {
        content: fs.readFileSync(outputMP3).toString('base64'),
    };
  
    //Config audio info
    const config = {
        encoding: 'MP3',
        sampleRateHertz: 16000,
        languageCode: 'en-US',
    };
    
    const request = {
        audio: audio,
        config: config,
    };

    // Detect speech in the audio file
    const [response] = await client.recognize(request);
    
    const transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join('\n');
    
    console.log(`Transcription: ${transcription}`);

    fs.writeFile(outputTxt, JSON.stringify(response.results), function(err) {
        if (err) {
            console.log(err);
        }
    });
}


module.exports={
    gcTranscribe
}

