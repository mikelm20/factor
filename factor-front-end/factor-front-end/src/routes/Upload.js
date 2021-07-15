import React from "react";
import FileUpload from "../components/FileUpload";
import NotLogged from "../components/NoLog";

function Upload() {
  
  const auth = window.localStorage.getItem('auth');

  if(auth){
    return (
      <div className="App-upload">
          <h3>Please upload a video to use the platform</h3>
          <FileUpload/>
      </div>
      
    );
  }
  else
    return <NotLogged/>
}

export default Upload;