import React from "react";
import FileUpload from "../components/FileUpload";

function Upload() {

  return (
    <div className="App-upload">
        <h2>Please upload a video to use the platform</h2>
        <FileUpload/>
    </div>
  );
  
}

export default Upload;