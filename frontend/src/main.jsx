// main.jsx
import React from 'react'
import { BrowserRouter } from "react-router-dom";
import { SignupProvider } from './store/session.jsx';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SignupProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SignupProvider>
  </React.StrictMode>,
)
