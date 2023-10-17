import React from 'react';
import "../styles/navbar.css";
import frogImg from "../assets/frog.png";

const NavBar = () => {
  return (
    <nav className='nav-bar'>
      <ul className='nav-bar__list'>
        <li className='nav-bar__logo'><a href="/"><img className='frog-img' src={frogImg}/></a></li>
        <li className='nav-bar__app-name'>Catchy/app Name here</li>
        {/* conditional to check if user is signed in or not and render approprietly */}
        <li className='nav-bar__user-btns'>
          <button>Sign In</button>
          <button>Sign Up</button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
