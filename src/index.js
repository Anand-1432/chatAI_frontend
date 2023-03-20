import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App';
import store from './store';

import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Auth0Provider
      domain="dev-rc3ei5glqsvwp6vv.us.auth0.com"
      clientId="X2zWYGrVKC8JNRJT5FnhuLG4SibVf3OL"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>

    </Auth0Provider>
  </BrowserRouter>
);
