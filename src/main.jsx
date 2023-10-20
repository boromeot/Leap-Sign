// main.jsx
import React from 'react'
import { createBrowserRouter, RouterProvider, BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import HomePage from './pages/home.jsx'
import AboutPage from './pages/AboutPage.jsx';
import SignUp from './pages/SignUp.jsx';
import NavBar from './components/NavBar.jsx';
import './index.css'

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <HomePage />,
//   },
//   {
//     path: "/about",
//     element: <AboutPage />
//   },
//   {
//     path: "/signup",
//     element: <SignUp />
//   }
// ]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
    // {/* <RouterProvider router={router}>
    //   <NavBar />
    // </RouterProvider> */}
)
