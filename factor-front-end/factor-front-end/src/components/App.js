import React from "react";
import Header from "./Header"
import '../styles/App.css';
import Routes from './Routes';
import { BrowserRouter as Router} from 'react-router-dom';
import Footer from "../components/Footer";

function App() {

  return (
      <div className="App">
        <Router>
        <div className="App-header">
          <Header/>
        </div>
        <div className="App-body">
          <Routes/>
        </div>
        <div className="App-footer">
          <Footer/>
        </div>
      </Router>
      </div>
  );
}

export default App;
