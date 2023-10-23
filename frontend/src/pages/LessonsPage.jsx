import React, {useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import classes from '../styles/LessonsPage.module.css';
import frogImg from '../assets/frog.png';
import leaf from '../assets/lilypad.png';
import FrogAnimation from '../pages/FrogAnimation';


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

const FiveLeafNodes = () => {
    const navigateTo = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const shouldAnimate = query.get("animate") === "true";
    const [animate, setAnimate] = useState(false);
    const [unlocked, setUnlocked] = useState(false);

    useEffect(() => {
        if(shouldAnimate) {
            setAnimate(true);
            setUnlocked(true);
        }
    }, [shouldAnimate])

    function handleClick() {
        navigateTo("/lessons/1");
    }


    return (
        <div className={classes.leafclass}>
            <div className={classes.frogContainer} onClick={handleClick} >
                {animate && <FrogAnimation animate={animate}/>}
                <img className={`${classes.frogImg} ${animate ? classes.animate : classes.frogImg}`} src={frogImg} alt='FrogLogo' />
                {leafnode()}
            </div>
            <div className={classes.lessonsLilyPad}>
                {unlocked ? (
                    leafnode()
                ) : (
                    <img className={classes.gray} src={leaf} alt="lilyPad" />
                )}
            </div>
            <div className={classes.lessonsLilyPad}>
                {unlocked ? (
                    leafnode()
                ) : (
                    <img className={classes.gray} src={leaf} alt="lilyPad" />
                )}
            </div>
            <div className={classes.lessonsLilyPad}>
                {unlocked ? (
                    leafnode()
                ) : (
                    <img className={classes.gray} src={leaf} alt="lilyPad" />
                )}
            </div>
            <div className={classes.lessonsLilyPad}>
                {unlocked ? (
                    leafnode()
                ) : (
                    <img className={classes.gray} src={leaf} alt="lilyPad" />
                )}
            </div>

        </div>
    )
}

export default FiveLeafNodes;
