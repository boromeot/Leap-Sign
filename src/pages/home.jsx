import React from 'react';
import NavBar from '../components/NavBar';
import HomeTextVideo from '../components/HomeTextVideo';

const HomePage = () => {
  return (
    <>
    <div>
      <NavBar />
      <h1>Home Page</h1>
      <p>Welcome to the Home Page!</p>
    </div>

    <HomeTextVideo />
    </>
  );
};

export default HomePage;
