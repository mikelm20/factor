const { exec } = require("child_process");
const extractAudio = require('ffmpeg-extract-audio');
var sox = require('sox');

const assets = process.env.WORKDIR+process.env.ASSETS;
const dirT = `${assets}/transcripts/`;
const dirV = `${assets}/videos/`;
const dirA = `${assets}/audios/`;

const executeDeepSpeech = async (videoFile)=>{

    const video = dirV+videoFile;
    const outputWav1 = dirA+videoFile.replace('.mp4','.wav');
    const outputWav2 = dirA+videoFile.replace('.mp4','_RS.wav');
    const outputTxt = dirT+"ds/"+videoFile.replace('.mp4','.txt');

    console.log("Extracting audio from:",video);

    // Extract audio from video
    
    await extractAudio({
        input: video,
        output: outputWav1
    });

    // Transcribe using DeepSpeech CLI

    console.log("Transcribing text from: ",outputWav1);

    exec(`deepspeech --model ${assets}/deepspeech-0.9.3-models.pbmm --scorer ${assets}/deepspeech-0.9.3-models.scorer --audio ${outputWav1} > ${outputTxt}`, (error, stdout, stderr) => {
    
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
        console.log("Transcribing done! --> ",outputTxt);
        console.log(stdout);
    });
}

module.exports = {
    executeDeepSpeech
}