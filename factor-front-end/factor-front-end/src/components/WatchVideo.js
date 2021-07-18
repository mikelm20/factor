import React from "react";

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
          const apiUrl = `http://localhost:5000/transcripts/transcript/ds/${fileName}`;
          fetch(apiUrl)
          .then((res) => res.text())
          .then((transcript) => {
            try{
              setDSText(transcript);
            } catch(err) {
              setDSText("No transcripts yet");
            }
          });
      },[ds, fileName]);

      React.useEffect(() => {
          const apiUrl = `http://localhost:5000/transcripts/transcript/ibm/${fileName}`;
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
          const apiUrl = `http://localhost:5000/transcripts/transcript/aws/${fileName}`;
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
          const apiUrl = `http://localhost:5000/transcripts/transcript/gc/${fileName}`;
          fetch(apiUrl)
          .then((res) => res.text())
          .then((obj) => {
            try {
              setGcText(obj);
            } catch(err) {
              setGcText("No transcripts yet");
              console.log(err);
            }
          });
      },[gc, fileName]);

       React.useEffect(() => {
          const apiUrl = `http://localhost:5000/transcripts/transcript/az/${fileName}`;
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
      
      const showDS = ()=>{
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
              <source src={"http://localhost:5000/videos/video/"+fileName} type='video/mp4' />
              {/* <track label="English" default kind="captions" srcLang="en"
              src={"http://localhost:5000/transcripts/transcript/"+fileName} /> */}
            </video>
          </div>
            
            <button id="trancribers" onClick={showAWS}>AWS</button>
            <button id="trancribers" onClick={showIbm}>IBM</button>
            <button id="trancribers" onClick={showGc}>Google</button>
            <button id="trancribers" onClick={showAz}>Azure</button>
            <button id="trancribers" onClick={showDS}>DeepSpeech</button>

          <div id="videoTranscript">
            <p>AWS</p>
            {aws ? awsText : null}
          </div>
          <div id="videoTranscript">
            <p>IBM</p>
            {ibm ? ibmText : null}
          </div>
          <div id="videoTranscript">
            <p>Google</p>
            {gc ? gcText : null}
          </div>
          <div id="videoTranscript">
            <p>Azure</p>
            {az ? azText : null}
          </div>
          <div id="videoTranscript">
            <p>DeepSpeech</p>
            {ds ? dsText : null}
          </div>
        </div>

      );
  }


  export default WatchVideo;