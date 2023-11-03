import React, { useState, useEffect } from 'react';
import classes from '../styles/SingleLesson.module.css';
import { useNavigate } from 'react-router-dom';
import FrogAnimation from './FrogAnimation';
import Camera from '../components/Camera';


export default function lesson() {
  const navigate = useNavigate();
  const lesson1 = ['thankyou', 'slow', 'again'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState(lesson1[currentIndex]);
  let debounceTimeout;

  useEffect(() => {
    setCurrentWord(lesson1[currentIndex]);
  }, [currentIndex, currentWord])

  function matchFunction() {
    if (!debounceTimeout) {
      debounceTimeout = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % lesson1.length);
        debounceTimeout = null;
      }, 2000); // Adjust the delay as needed (e.g., 1000ms = 1 second)
    }
  }

  const navigateBackToLessons = () => {
    navigate('/lessons', { state: { animate: true, unlock: true } });
  }

  return (
      <>
        <div>
          <Camera word={currentWord} threshold={0.9} matchFunction={matchFunction} />
          <button onClick={navigateBackToLessons}>
            Continue
          </button>
          <div>Please sign {currentWord}</div>
        </div>
      </>
  )
}