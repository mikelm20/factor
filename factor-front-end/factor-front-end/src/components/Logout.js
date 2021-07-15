import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { useHistory } from "react-router-dom";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function Logout() {
  
  let history = useHistory();
  
  const onSuccess = () => {
    console.log('Logout made successfully');
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('auth');
    history.push('/login');
  };

  return (
      <GoogleLogout
        clientId={clientId}
        buttonText="SIGN OUT"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
  );
}

export default Logout;