import React from "react";
import axios from "axios";

const FileUpload = () => {

  const [title, setTitle] = React.useState("");
  const [file, setFile] = React.useState(null);
  const email = window.localStorage.getItem("email");
  const owner = window.localStorage.getItem('owner');

  const onFileChange = event => { 
      // Update the state 
      setFile(event.target.files[0]); 
  }; 
     
  // On file upload (click the upload button) 
  const onFileUpload = () => { 
    // Create an object of formData 
  
    console.log(owner);
    const formData = new FormData(); 
      
    // Update the formData object 
    formData.append( "file", file);
    formData.append( "email", email);
    formData.append( "owner", owner);
    formData.append( "title", title);

    axios.post('http://localhost:5000/videos/upload', formData)
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
    <div className="App-fileUpload">
        <div>
            <label for="fname">Video name: </label>
            <input id= "fname"type="text" value={title} onChange={onTextChange}/>
          <div>
            <input type="file" onChange={onFileChange} /> 
            <button onClick={onFileUpload}> Upload </button> 
            </div> 
        </div>
    </div>
  );
}

export default FileUpload;
