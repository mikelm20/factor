import React from 'react';
import { Link } from 'react-router-dom';

const NotLogged = () => {
  return(
   <div className="NoUser">
            <p>User not authenticated</p>
            <p><Link to='/login'>Login</Link></p>
        </div>
  );
}

export default NotLogged;