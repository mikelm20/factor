const extractAudio = require('ffmpeg-extract-audio');
const fs = require("fs");
const sdk = require("microsoft-cognitiveservices-speech-sdk");


const assets = process.env.WORKDIR+process.env.ASSETS;
const dirT = `${assets}/transcripts/`;
const dirV = `${assets}/videos/`;
const dirA = `${assets}/audios/`;

const azTranscribe = async (videoFile) =>{

    const video = dirV+videoFile;
    const outputWAV = dirA+videoFile.replace('.mp4','.wav');
    const outputTxt = dirT+"az/"+videoFile.replace('.mp4','.txt');

    console.log("Extracting audio from:",video);

    // Extract audio from video
    
    await extractAudio({
        input: video,
        output: outputWAV
    });

    console.log("Extracted");

    //Load audio in wav format
    let audioConfig = sdk.AudioConfig.fromWavFileInput(fs.readFileSync(outputWAV));

    //Configure credentials for Azure Cognitive API
    const speechConfig = sdk.SpeechConfig.fromSubscription(process.env.AZURE_API_KEY, process.env.AZURE_API_LOCATION);

    let recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
    let lastTranscript="";
    let transcript="";
    let offset = 0;
    recognizer.recognizing = (s, e) => {

        if(e.result.offset>offset){
            offset=e.result.offset;
            transcript=transcript+lastTranscript;
        }
        if(e.result.offset==offset){
            lastTranscript=e.result.text;
        }
    };

    recognizer.recognized = (s, e) => {
        if (e.result.reason == ResultReason.RecognizedSpeech) {
            console.log(`RECOGNIZED: Text=${e.result.text}`);
        }
        else if (e.result.reason == ResultReason.NoMatch) {
            console.log("NOMATCH: Speech could not be recognized.");
        }
    };

    recognizer.canceled = (s, e) => {
                
        if (e.reason == CancellationReason.Error) {
            console.log(`"CANCELED: ErrorCode=${e.errorCode}`);
            console.log(`"CANCELED: ErrorDetails=${e.errorDetails}`);
            console.log("CANCELED: Did you update the subscription info?");
        }else{
            console.log("Transcription done!")
        }   

        recognizer.stopContinuousRecognitionAsync();
    };

    recognizer.sessionStopped = (s, e) => {
        recognizer.stopContinuousRecognitionAsync();
        const t = transcript+" "+lastTranscript;
        console.log("Azure result:", t);
        fs.writeFile(outputTxt, t, function(err) {
            if (err) {
                console.log(err);
            }else {
                console.log("Transcripts saved in:", outputTxt);
            }
        });
    };
    
    recognizer.startContinuousRecognitionAsync();

}

module.exports = {
   azTranscribe
}

