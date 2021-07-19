import React from 'react';
import { Link } from 'react-router-dom';

const NotLogged = () => {
  return(
   <div className="NoUser">
     <h2>Are you lost?</h2>
      <p><Link to='/login'>Yes, take me back</Link></p>
    </div>
  );
}

export default NotLogged;