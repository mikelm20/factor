const { exec } = require("child_process");

const executeDeepSpeech = async (audioFile)=>{
    
    exec(`deepspeech --model ./models/deepspeech-0.9.3-models.pbmm --scorer ./models/deepspeech-0.9.3-models.scorer --audio ${audioFile}`, (error, stdout, stderr) => {
    
        if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
        console.log(stdout);
        return stdout;
    });
}

module.exports = {
    executeDeepSpeech
}