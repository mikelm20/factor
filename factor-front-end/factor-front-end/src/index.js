import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter} from 'react-router-dom';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT;
const redirectUri = process.env.REACT_APP_AUTH0_REDIRECT;

ReactDOM.render(
  <BrowserRouter>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={redirectUri}
    >
      <App/>
    </Auth0Provider>
  </BrowserRouter>,
  document.getElementById("root")
);