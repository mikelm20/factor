import React from "react";
import { Link } from "react-router-dom";
import '../styles/App.css';


const Header = () =>{

  return (
      <div>
        <div id="button-home">
           <Link to='/home'>Home</Link>
        </div>
        <h1>Welcome to Factor!</h1>
      </div>
  );
}

export default Header;
