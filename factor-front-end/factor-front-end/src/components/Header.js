import React from "react";
import logo from '../sources/logo-factor-v3.png';
import '../styles/App.css';

const Header = () =>{

  return (
      <div>
        <h1>Welcome to Factor!</h1>
        <img src={logo} className="App-logo" alt="logo" />
      </div>
  );
}

export default Header;
