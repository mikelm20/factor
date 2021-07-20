import React from "react";
import '../styles/App.css';
import logo from "../sources/logo.png"

const Header = () =>{

  return (
      <>
      <div className="App-logo">
        <img src={logo} alt="logo" height="150px"/>
      </div>
      </>
  );
}

export default Header;
