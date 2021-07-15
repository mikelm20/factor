import React from "react";

  const WatchVideo = ({name}) => {

    const [text, setText] = React.useState("");

        React.useEffect((name) => {
            const apiUrl = `http://localhost:5000/transcripts/transcript/${name}`;
            fetch(apiUrl)
            .then((res) => res.json())
            .then((transcript) => {
                setText(transcript);
            });
      }, []);

      return (
        <div>
          <div id="video">
            <video class="library" controls preload="auto" muted crossOrigin="anonymous">
              <source src={"http://localhost:5000/videos/video/"+name} type='video/mp4' />
              <track label="English" default kind="captions" srcLang="en"
              src={"http://localhost:5000/transcripts/transcript/"+name} />
            </video>
          </div>
          <div id="videoTranscript">
            <p>{text.Message}</p>
          </div>
        </div>

      );
  }


  export default WatchVideo;