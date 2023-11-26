import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Routing from './Routing.jsx';
import { Auth0Provider } from '@auth0/auth0-react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        redirectUri={window.location.origin}
      >
        <Routing />
      </Auth0Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
