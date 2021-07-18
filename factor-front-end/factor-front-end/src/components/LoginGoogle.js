import React from 'react';
import { useHistory } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from '../utils/refreshToken';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function LoginGoogle(props) {

  let history = useHistory();

  const onSuccess = (res) => {
    props.login(true);
    window.localStorage.setItem('owner',res.profileObj.name);
    window.localStorage.setItem('email',res.profileObj.email);
    history.push('/home');
    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    props.login(false);
    console.log('Login failed: res:', res);
    history.push('/unauthorized');
  };

  return (
    <div className="login">
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={true}
      />
    </div>
  );
}

export default LoginGoogle;