import React from "react";
import FileUpload from "../components/FileUpload";
import NotLogged from "../components/NotLogged";

function Upload(props) {

  if(props.auth){
    return (
      <div className="App-upload">
          <h2>Please upload a video to use the platform</h2>
          <FileUpload/>
      </div>
    );
  }
  else
    return <NotLogged/>
}

export default Upload;