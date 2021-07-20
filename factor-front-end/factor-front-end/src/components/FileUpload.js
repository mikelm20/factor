import React from "react";
import axios from "axios";

const FileUpload = () => {

  const [title, setTitle] = React.useState("");
  const [file, setFile] = React.useState(null);

  const onFileChange = event => { 
      // Update the state 
      setFile(event.target.files[0]); 
  }; 
     
  // On file upload (click the upload button) 
  const onFileUpload = () => { 
    
    // Create an object of formData 
    const formData = new FormData(); 
      
    // Update the formData object with the File and the API parameters
    formData.append( "file", file);
    formData.append( "email", window.localStorage.getItem("email"));
    formData.append( "owner", window.localStorage.getItem("user"));
    formData.append( "title", title);

    axios.post(`${process.env.REACT_APP_BACKEND}/videos/upload`, formData)
    .then(function (response) {
      alert(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const onTextChange = event => {
    setTitle(event.target.value);
  }

  return (
    <div id="App-fileUpload">
      <div id="App-fileNaming">
          <label for="fname">Tittle: </label>
          <input id= "fname" type="text" value={title} onChange={onTextChange}/>
      </div> 
      
      <div className="upload-button" onClick={onFileUpload}> Upload</div> 
        
      <div id="App-fileSelector">
        <input type="file" class="custom-file-input" onChange={onFileChange} accept=".mp4"/> 
      </div> 
    </div>
  );
}

export default FileUpload;
