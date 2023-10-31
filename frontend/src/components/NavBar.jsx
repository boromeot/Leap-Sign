import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ModalBackground from './ModalBackground';
import frogImg from "../assets/frog.png";
import * as sessionActions from "../store/session";
import "../styles/navbar.css";

const NavBar = () => {
  const dispatch = useDispatch();
  const userSession = useSelector(state => state.session.user);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  function logout() {
    dispatch(sessionActions.logout());
  }

  function showSignInHandler() {
    setShowSignIn(true);
    setShowSignUp(false);
  }

  function hideSignInHandler() {
    setShowSignIn(false);
  }

  function showSignUpHandler() {
    setShowSignUp(true);
    setShowSignIn(false);
  }

  function hideSignUpHandler() {
    setShowSignUp(false);
  }

  return (
    <nav className='nav-bar'>
      <ul className='nav-bar__list'>
        <li className='nav-bar__logo'><Link to="/"><img className='frog-img' src={frogImg} alt="Frog Logo"/><p className='nav-logo'>LeapSign</p></Link></li>
        {/* <li className='nav-bar__app-name'>Catchy/app Name here</li> */}
        <li className='nav-bar__user-btns'>
          {/* <Link to="/signin"><button>Sign In</button></Link>
          <Link to="/signup"><button>Sign Up</button></Link> */}
          {userSession ? <button onClick={logout}>Log Out</button> : (
            <div style={{display: 'flex', gap: '10px'}}>
              <button onClick={showSignInHandler}>Sign In</button>
              <button onClick={showSignUpHandler}>Sign Up</button>
            </div>
          )}
        </li>
      </ul>
          {showSignIn ? <ModalBackground closeModal={hideSignInHandler} signIn={showSignIn}/> : null}
          {showSignUp ? <ModalBackground closeModal={hideSignUpHandler} signUp={showSignUp}/> : null }
    </nav>
  );
};

export default NavBar;
