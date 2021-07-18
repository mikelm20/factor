import React from 'react';
import NotLogged from "../components/NotLogged";

const Unauthorized = () => {
  
  return (
    <div>
      <h2>403 - You should not be here</h2>
        <NotLogged></NotLogged>
    </div>
  );
}

export default Unauthorized;