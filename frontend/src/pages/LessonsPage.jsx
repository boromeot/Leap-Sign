import React from 'react'; 
import classes from '../styles/LessonsPage.module.css';
import frogImg from '../assets/frog.png';
import leaf from '../assets/lilypad.png';


const shoot = () => {
        alert("Great Shot!");
      }

const leafnode = () => {
    return (
        <div>
            <div className={classes.pulse1}></div>
            <div className={classes.pulse2}></div>
            <button className={classes.profilepicture} onClick={shoot}>
                <img className={classes.leafimg} src={leaf} alt="lilyPad" />
            </button>
        </div>
    )
}

const FiveLeafNodes = () => {
    return (
        <div className={classes.leafclass}>
            <div  className={classes.lessonsLilyPad}>
                    {leafnode()}
                </div>
                <div className={classes.lessonsLilyPad}>
                    {leafnode()}
                </div>
                <div className={classes.lessonsLilyPad}>
                    {leafnode()}
                </div>
                <div className={classes.lessonsLilyPad}>
                    {leafnode()}
                </div>
                <div className={classes.lessonsLilyPad}>
                    {leafnode()}
                </div>

        </div>
    )
}

export default FiveLeafNodes;
