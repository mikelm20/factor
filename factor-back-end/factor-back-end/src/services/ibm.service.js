const extractAudio = require('ffmpeg-extract-audio');
const fs = require("fs");
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const assets = process.env.WORKDIR+process.env.ASSETS;
const dirT = `${assets}/transcripts/`;
const dirV = `${assets}/videos/`;
const dirA = `${assets}/audios/`;

const transcribeIBM = async (videoFile) =>{

const speechToText = new SpeechToTextV1({
    authenticator: new IamAuthenticator({
      apikey: process.env.IBM_API_KEY,
    }),
    serviceUrl: process.env.IBM_SERVICE_URL,
    disableSslVerification: true,
  });

    const video = dirV+videoFile;
    const outputMP3 = dirA+videoFile.replace('.mp4','.mp3');
    const outputTxt = dirT+"ibm/"+videoFile.replace('.mp4','.txt');

    console.log("Extracting audio from:",video);

    // Extract audio from video
    
    await extractAudio({
        input: video,
        output: outputMP3
    });

    console.log("Extracted");

    const fileStream = fs.createReadStream(outputMP3);
    fileStream.on('error', function(err) {
        console.log('File Error', err);
    });

    const params = {
        audio: fileStream,
        contentType: "audio/mp3"
    };

    const text= await speechToText.recognize(params);
    let transcript = "";

    if(text.statusText=="OK"){
        for(let i=0; i< text.result.results.length; i++){
            transcript = transcript+text.result.results[i].alternatives[0].transcript;
        } 
    }
    
    console.log("Transcription:",transcript);

    fs.writeFile(outputTxt, JSON.stringify(text), function(err) {
        if (err) {
            console.log(err);
        }
        else return outputTxt
    });
}

/*[

    {"final":true,
    "alternatives":[
        {"transcript":"hi my name is Megan McLean and this is a quick email with my restaurant manager application for eighteen decide then ","confidence":0.67}
    ]},

    {"final":true,
    "alternatives":[
        {"transcript":"we can begin by clicking the button in the start up screen ","confidence":0.79}
    ]},

    {"final":true,
    "alternatives":[
        {"transcript":"here you can choose either your role or to view the restaurant's menu ","confidence":0.8}
    ]},

    {"final":true,
    "alternatives":[
        {"transcript":"the admiral creates managers and the manager role creates menus we're going to start ","confidence":0.74}
    ]}

]*/

module.exports = {
    transcribeIBM
}

