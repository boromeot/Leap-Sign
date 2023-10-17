import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ReactDOM from 'react-dom/client'
import HomePage from './pages/home.jsx'
import AboutPage from './pages/AboutPage.jsx';
// import App from './App.jsx'
import './index.css'
import NavBar from './components/NavBar.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/about",
    element: <AboutPage />
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NavBar />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
