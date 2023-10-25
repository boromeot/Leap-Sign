import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ModalBackground from './ModalBackground';
import frogImg from "../assets/frog.png";
import "../styles/navbar.css";

const NavBar = () => {

  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  function showSignInHandler() {
    setShowSignIn(true);
    setShowSignUp(false);
  }

  function hideSignInHandler() {
    setShowSignIn(false);
  };

  function showSignUpHandler() {
    setShowSignUp(true);
    setShowSignIn(false);
  }

  function hideSignUpHandler() {
    setShowSignUp(false);
  };

  return (
    <nav className='nav-bar'>
      <ul className='nav-bar__list'>
        <li className='nav-bar__logo'><Link to="/"><img className='frog-img' src={frogImg} alt="Frog Logo"/><p className='nav-logo'>LeapSign</p></Link></li>
        {/* <li className='nav-bar__app-name'>Catchy/app Name here</li> */}
        <li className='nav-bar__user-btns'>
          {/* <Link to="/signin"><button>Sign In</button></Link>
          <Link to="/signup"><button>Sign Up</button></Link> */}
          <button onClick={showSignInHandler}>Sign In</button>
          <button onClick={showSignUpHandler}>Sign Up</button>
        </li>
      </ul>

      {showSignIn ? <ModalBackground closeModal={hideSignInHandler} signIn={showSignIn}/> : null}
      {showSignUp ? <ModalBackground closeModal={hideSignUpHandler} signUp={showSignUp}/> : null }
    </nav>
  );
};

export default NavBar;
