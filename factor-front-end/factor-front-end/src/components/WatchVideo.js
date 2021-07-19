import React from "react";
const api = process.env.REACT_APP_BACKEND;

  const WatchVideo = ({name}) => {

    const [fileName] = React.useState(name);
    const [ibm, setIBM] = React.useState(false);
    const [ibmText, setIBMText] = React.useState("");
    const [aws, setAWS] = React.useState(false);
    const [awsText, setAWSText] = React.useState("");
    const [ds, setDS] = React.useState(false);
    const [dsText, setDSText] = React.useState("");
    const [gc, setGc] = React.useState(false);
    const [gcText, setGcText] = React.useState("");
    const [az, setAz] = React.useState(false);
    const [azText, setAzText] = React.useState("");

      React.useEffect(() => {
          const apiUrl = `${api}/transcripts/transcript/ds/${fileName}`;
          fetch(apiUrl)
          .then((res) => res.text())
          .then((transcript) => {
            try{
              setDSText(transcript);
            } catch(err) {
              setDSText(transcript);
            }
          });
      },[ds, fileName]);

      React.useEffect(() => {
          const apiUrl = `${api}/transcripts/transcript/ibm/${fileName}`;
          fetch(apiUrl)
          .then((res) => res.text())
          .then((obj) => {
            try {
              const t = JSON.parse(obj);
              let transcript = "";
              if(t.statusText ==="OK"){
                for(let i=0; i < t.result.results.length; i++){
                  transcript = transcript+t.result.results[i].alternatives[0].transcript;
                }
              }
              setIBMText(transcript);
            } catch(err) {
              setIBMText("No transcripts yet");
            }
          });
      },[ibm, fileName]);

      React.useEffect(() => {
          const apiUrl = `${api}/transcripts/transcript/aws/${fileName}`;
          fetch(apiUrl)
          .then((res) => res.text())
          .then((obj) => {
            try {
              const t = JSON.parse(obj);
              let transcript = t.results.transcripts[0].transcript;
              setAWSText(transcript);
            } catch(err) {
              setAWSText("No transcripts yet");
              console.log(err);
            }
          });
      },[aws, fileName]);

       React.useEffect(() => {
          const apiUrl = `${api}/transcripts/transcript/gc/${fileName}`;
          fetch(apiUrl)
          .then((res) => res.text())
          .then((obj) => {
            try {
              const transcription = JSON.parse(obj)
        .map(result => result.alternatives[0].transcript)
              setGcText(transcription);
            } catch(err) {
              setGcText("No transcripts yet");
              console.log(err);
            }
          });
      },[gc, fileName]);

       React.useEffect(() => {
          const apiUrl = `${api}/transcripts/transcript/az/${fileName}`;
          fetch(apiUrl)
          .then((res) => res.text())
          .then((obj) => {
            try {
              setAzText(obj);
            } catch(err) {
              setAzText("No transcripts yet");
              console.log(err);
            }
          });
      },[az, fileName]);

      const showIbm = ()=>{
        setIBM(!ibm);
      }
      
      const showDs = ()=>{
        setDS(!ds);
      }

      const showAWS = ()=>{
        setAWS(!aws);
      }

      const showGc = ()=>{
        setGc(!gc);
      }

      const showAz = ()=>{
        setAz(!az);
      }

      return (
        <div>
          <div id="video">
            <video className="library" controls preload="auto" muted crossOrigin="anonymous">
              <source src={process.env.REACT_APP_BACKEND+"/videos/video/"+fileName} type='video/mp4' />
              {/* <track label="English" default kind="captions" srcLang="en"
              src={process.env.REACT_APP_BACKEND+"/transcripts/transcript/"+fileName} /> */}
            </video>
          </div>

          <div id="videoTranscript" onClick={showAWS}>
            {aws ? awsText : "AWS Transcribe"}
          </div>
          
          <div id="videoTranscript" onClick={showIbm}>
            {ibm ? ibmText : "IBM Watson" }
          </div>
          
          <div id="videoTranscript" onClick={showGc}>
            {gc ? gcText : "Google Cloud"}
          </div>
          
          <div id="videoTranscript" onClick={showAz}>
            {az ? azText : "Azure Cognitive"}
          </div>
          
          <div id="videoTranscript" onClick={showDs}>
            {ds ? dsText : "DeepSpeech"}
          </div>
        </div>

      );
  }


  export default WatchVideo;