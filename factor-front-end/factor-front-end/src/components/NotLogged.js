import React from 'react';
import { Link } from 'react-router-dom';

const NotLogged = () => {
  return(
   <div className="NoUser">
      <p><Link to='/login'>Take me back</Link></p>
    </div>
  );
}

export default NotLogged;