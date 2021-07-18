import React from "react";
import { useParams } from "react-router-dom";
import WatchVideo from "../components/WatchVideo";
import NotLogged from "../components/NotLogged";

  const Watch = (props) => {

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

    if(props.auth){
      return (
        <div>
          <button className="transcriptShow" id="awsShow" onClick={aws}></button>
          <button className="transcriptShow" id="ibmShow" onClick={ibm}></button>
          <button className="transcriptShow" id="gcShow" onClick={gc}></button>
          <button className="transcriptShow" id="azShow" onClick={az}></button>
          <button className="transcriptShow" id="dsShow" onClick={ds}></button>
          <div id="videoFrame">
            <WatchVideo name={id}/>
          </div>
        </div>
      );
    }
    else return <NotLogged/>
  }


  export default Watch;