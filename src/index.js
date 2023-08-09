import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Context } from './context/productcontex';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-e3auvekf0tr67sui.us.auth0.com"
    clientId="ytCgmwSaekuSAwji6V2hM9OlxUe7wnG5"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <Context>
      <App />
    </Context>
  </Auth0Provider>

);