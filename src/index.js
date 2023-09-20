import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Context } from './context/productcontex';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-j0xrq56yfw32r3vg.us.auth0.com"
    clientId="dO0UQw0wEyWKo8h3CZZIBxSAvwDta7wM"
    // domain="dev-mvgenwalyhhy3a2p.us.auth0.com"
    // clientId='0R5b03qttaU1Kfk9jCB26rlcJXpoSRsy'
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <Context>
      <App />
    </Context>
  </Auth0Provider>

);
