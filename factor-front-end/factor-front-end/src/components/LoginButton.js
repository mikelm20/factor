import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return !isAuthenticated && (<div id="login-main" onClick={loginWithRedirect}>Log in</div>);

}

export default LoginButton;