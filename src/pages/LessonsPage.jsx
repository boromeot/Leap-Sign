import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import classes from '../styles/LessonsPage.module.css';
import frogImg from '../assets/frog.png';
import leaf from '../assets/lilypad.png';
import SingleLesson from '../pages/SingleLesson'

// const shoot = () => {
//     alert("Great Shot!");
// }

const leafnode = () => {
    return (
        <div>
            <div className={classes.pulse1}></div>
            <div className={classes.pulse2}></div>
            <button className={classes.profilepicture}>
                <img className={classes.leafimg} src={leaf} alt="lilyPad" />
            </button>
        </div>
    )
};

// const reset = () => {
//     setUnlocked(false)
// };


const FiveLeafNodes = () => {
    const navigateTo = useNavigate();

    const [unlocked, setUnlocked] = useState(false);
    function handleClick() {
        navigateTo("/lessons/1");
    }
    if (!unlocked) {
        setUnlocked(true)
    }

    return (
        <div className={classes.leafclass}>

            <div className={classes.frogContainer}  onClick={handleClick} >
                <img className={classes.frogImg} src={frogImg} alt='FrogLogo' />
                {leafnode()}

                {/* <button onClick={handleClick}> click me</button> */}
            </div>
            <div className={classes.lessonsLilyPad}>
                {!unlocked ? (
                    leafnode()
                ) : (
                    <img className={classes.gray} src={leaf} alt="lilyPad" />
                )}
            </div>
            <div className={classes.lessonsLilyPad}>
                {!unlocked ? (
                    leafnode()
                ) : (
                    <img className={classes.gray} src={leaf} alt="lilyPad" />
                )}
            </div>
            <div className={classes.lessonsLilyPad}>
                {!unlocked ? (
                    leafnode()
                ) : (
                    <img className={classes.gray} src={leaf} alt="lilyPad" />
                )}
            </div>
            <div className={classes.lessonsLilyPad}>
                {!unlocked ? (
                    leafnode()
                ) : (
                    <img className={classes.gray} src={leaf} alt="lilyPad" />
                )}
            </div>

        </div>
    )
}

export default FiveLeafNodes;
