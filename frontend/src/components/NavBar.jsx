import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ModalBackground from './ModalBackground';
import ProfileButton from './profileButton';
import frogImg from "../assets/frog.png";
import userIcon from '../assets/user-icon.png';
import login2 from '../assets/log-in2.png';
import login3 from '../assets/log-in3.png';
import login4 from '../assets/log-in4.png';


import "../styles/navbar.css";

const NavBar = () => {

  const userSession = useSelector(state => state.session.user);
  // console.log("userSession in NavBar: ", userSession);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showProfileButton, setShowProfileButton] = useState(false)

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

  function showProfileButtonHandler () {
    setShowProfileButton(!showProfileButton)
  }

  function hideUserProfileButton () {
    setShowProfileButton(false)
  }


  return (
    <nav className='nav-bar'>
      <ul className='nav-bar__list'>
        <li className='nav-bar__logo'><Link to="/"><img className='frog-img' src={frogImg} alt="Frog Logo"/><p className='nav-logo'>LeapSign</p></Link></li>
        {/* <li className='nav-bar__app-name'>Catchy/app Name here</li> */}
        <li className='nav-bar__user-btns'>
          {/* <Link to="/signin"><button>Sign In</button></Link>
          <Link to="/signup"><button>Sign Up</button></Link> */}
          {userSession ? 
          
          <div className='userprofileDiv' onClick={showProfileButtonHandler}>
            <img src={login2} alt={userSession.username}  />
            <i className="fa-solid fa-bars"></i>
            {showProfileButton ? <div className='profileButtonDiv' onMouseLeave={hideUserProfileButton}><ProfileButton sessionUser={userSession} /></div> : null}
          </div> 
          : (
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
