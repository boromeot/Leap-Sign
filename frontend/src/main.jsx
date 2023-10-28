// main.jsx
import React from 'react'
// import { SignupProvider } from './store/session.jsx';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { restoreCSRF, csrfFetch } from './store/csrf';

import configureStore from './store';
import * as sessionActions from "./store/session";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

// if (process.env.NODE_ENV !== 'production') {
//   window.store = store;
// }


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <SignupProvider> */}
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
    {/* </SignupProvider> */}
  </React.StrictMode>,
)
