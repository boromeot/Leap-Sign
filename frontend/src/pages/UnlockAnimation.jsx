import React, { useEffect } from 'react';
import classes from '../styles/LessonsPage.module.css';

const UnlockAnimation = ({ unlock }) => {
  useEffect(() => {
    if (unlock) {
      document.querySelector(`.${classes.lock}`).classList.add(classes.unlock);
      document.querySelector(`.${classes.gray}`).classList.add(classes.unlock);
    }
  }, []);

  return null; // No need to return any JSX for this component
};

export default UnlockAnimation;
