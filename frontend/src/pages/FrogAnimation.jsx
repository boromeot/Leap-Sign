import React, { useEffect } from 'react';
import classes from '../styles/LessonsPage.module.css';

const FrogAnimation = ({ animate }) => {
  useEffect(() => {
    if (animate) {
      document.querySelector(`.${classes.frogImg}`).classList.add(classes.animation);
    }
  }, []);

  return null; // No need to return any JSX for this component
};

export default FrogAnimation;
