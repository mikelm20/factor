import React from "react";
import '../styles/App.css';
import Routes from './Routes';
import Footer from "../components/Footer";

function App() {

  return (
      <div className="App">
          <div className="App-body">
            <Routes/>
          </div>
          <div className="App-footer">
            <Footer/>
          </div>
      </div>
  );
}

export default App;
