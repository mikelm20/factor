import React from "react";
import { useParams } from "react-router-dom";
import WatchVideo from "../components/WatchVideo";

  const Watch = () => {

    const { id } = useParams();

    const aws = () => {
      if(window.confirm("This may incur in a monetary cost, are you sure?")){
        const apiUrl = `http://127.0.0.1:5000/transcripts/transcribe/aws/${id}`;
        fetch(apiUrl)
        .then((res) => res.json())
        .then((response) => {
            alert(response);
        });
      }
    }

    const ibm = () => {
      if(window.confirm("This may incur in a monetary cost, are you sure?")){
        const apiUrl = `http://127.0.0.1:5000/transcripts/transcribe/ibm/${id}`;
        fetch(apiUrl)
        .then((res) => res.json())
        .then((response) => {
            alert(response);
        });
      }
    }

    const gc = () => {
      if(window.confirm("This may incur in a monetary cost, are you sure?")){
        const apiUrl = `http://127.0.0.1:5000/transcripts/transcribe/gc/${id}`;
        fetch(apiUrl)
        .then((res) => res.json())
        .then((response) => {
            alert(response);
        });
      }
    }

    const ds = () => {
      if(window.confirm("This may incur in a monetary cost, are you sure?")){
        const apiUrl = `http://127.0.0.1:5000/transcripts/transcribe/ds/${id}`;
        fetch(apiUrl)
        .then((res) => res.json())
        .then((response) => {
            alert(response);
        });
      }
    }

    const az = () => {
      if(window.confirm("This may incur in a monetary cost, are you sure?")){
        const apiUrl = `http://127.0.0.1:5000/transcripts/transcribe/az/${id}`;
        fetch(apiUrl)
        .then((res) => res.json())
        .then((response) => {
            alert(response);
        });
      }
    }

      return (
        <div>
          <button id="trancribers" onClick={aws}>AWS</button>
          <button id="trancribers" onClick={ibm}>IBM</button>
          <button id="trancribers" onClick={gc}>Google</button>
          <button id="trancribers" onClick={az}>Azure</button>
          <button id="trancribers" onClick={ds}>DeepSpeech</button>
          <div id="videoFrame">
            <WatchVideo name={id}/>
          </div>
        </div>
      );
  }


  export default Watch;