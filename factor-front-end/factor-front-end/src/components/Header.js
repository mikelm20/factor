import React from "react";
import '../styles/App.css';
import logo from "../sources/logo.png"

const Header = () =>{

  return (
      <div>
      <div className="App-logo">
        <img src={logo} alt="logo" height="150px"/>
      </div>
      </div>
  );
}

export default Header;
