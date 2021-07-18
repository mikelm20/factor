import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { useHistory } from "react-router-dom";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function Logout(props) {
  
  let history = useHistory();
  
  const onSuccess = () => {
    console.log('Logout made successfully');
    window.localStorage.removeItem('owner');
    window.localStorage.removeItem('email');
    props.login(false);
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