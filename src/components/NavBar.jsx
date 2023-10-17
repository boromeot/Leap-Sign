import React from 'react';
import { Link } from 'react-router-dom';
import frogImg from "../assets/frog.png";
import "../styles/navbar.css";

const NavBar = () => {
  return (
    <nav className='nav-bar'>
      <ul className='nav-bar__list'>
        <li className='nav-bar__logo'><Link to="/"><img className='frog-img' src={frogImg} alt="Frog Logo"/></Link></li>
        <li className='nav-bar__app-name'>Catchy/app Name here</li>
        <li className='nav-bar__user-btns'>
          <Link to="/signin"><button>Sign In</button></Link>
          <Link to="/signup"><button>Sign Up</button></Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
