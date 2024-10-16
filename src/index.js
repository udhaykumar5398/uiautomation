// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import _store from './Store';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const { persistor, Store } = _store();

// Debug logging
console.log('Persistor:', persistor);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <PersistGate persistor={persistor}>
      <Provider store={Store}>
        <App />
      </Provider>
    </PersistGate>
  </Router>
);

// Register the service worker
serviceWorkerRegistration.register();


// Optionally: Unregister service worker when not needed
// unregister();
