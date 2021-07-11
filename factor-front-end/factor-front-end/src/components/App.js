import logo from '../sources/logo.svg';
import '../styles/App.css';
import React from "react";

function App() {

  const handleSubmit = (event) => {
    event.preventDefault();
    //Upload video

  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Welcome to Factor, please upload a video to use the platform:</p>
        <div>
          <form onSubmit={handleSubmit}>
            <button type="submit">Upload video</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
