import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classes from '../styles/LessonsPage.module.css';
import frogImg from '../assets/frog.png';
import leaf from '../assets/lilypad.png';
import lock from '../assets/lock.svg';
import FrogAnimation from '../pages/FrogAnimation';
import UnlockAnimation from './UnlockAnimation';
import { userLessons } from '../store/lesson';
import Footer from '../components/footer';
import ReactAnime from 'react-animejs'
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
function animatedFrog(lessonNumber, navigate) {
  const { Anime, stagger } = ReactAnime;

  const handleclick = () => {
    navigate(`/lessons/${lessonNumber}`);
  }
  return (
    <Anime
      initial={[
        {
          targets: "#Box",
          translateX: 50,
          // easing: "linear"
          easing: "easeOutBounce"
        }
      ]}
    >
      <img
        id="Box" style={{
          height: 200,
          width: 200,
          margin: "auto", // Center the element

        }}
        className={classes.frogImg}
        src={frogImg}
        alt='FrogLogo'
        onClick={handleclick}
      />
    </Anime>
  )
}
const FiveLeafNodes = () => {
  const lessons = useSelector((state) => state.lesson.allLessons);
  const lessonsArr = Object.values(lessons);
  console.log(lessonsArr, "lessonsArr");
  let countOfLilyPad = 0;

  for (let lesson of lessonsArr) {
    if (lesson.unlocked == true) {
      countOfLilyPad += 1;
    }
  }


  const navigate = useNavigate();
  const location = useLocation();
  const [animate, setAnimate] = useState(false);
  const [curLesson, setCurLesson] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    const sortedLessons = lessonsArr.filter((lesson) => lesson.unlocked).sort((a, b) => b.lessonId - a.lessonId);
  
    if (sortedLessons.length > 0) {
      const mostRecentLesson = sortedLessons[0];
     
      setCurLesson(mostRecentLesson.lessonId);
    
    }
  }, [lessonsArr, curLesson]);
  useEffect(() => {
    dispatch(userLessons());
  }, [dispatch]);

  


  if (lessonsArr.length < 1) {
    return (<p>Loading...</p>);
  }

  function handleLilyPadClick(lessonNumber) {

    // Set animate to 'true' in localStorage
    localStorage.setItem('animate', 'true');


    // Navigate to a different page
    navigate(`/lessons/${lessonNumber}`);

    // Set animate back to 'false' after 2 seconds to stop the animation
    setTimeout(() => {
      localStorage.setItem('animate', 'false');
      setAnimate(false);
    }, 2000);

  }

  return (
    <>
      <div className={classes.leafclass}>
        

        {lessonsArr.map((lesson) => (
          <div className={classes.lessonsLilyPad} key={lesson.id}>

            <h4>Lesson: {lesson.lessonId}</h4>

            {curLesson === lesson.lessonId && lesson.unlocked && animatedFrog(curLesson, navigate)}
            {lesson.lessonId && lesson.unlocked ?
              <>
                <div
                  onClick={() => {
                    handleLilyPadClick(lesson.lessonId);
                  }}
                >
                  {leafnode()}

                </div>

              </>


              :
              <>
                <img className={classes.gray} src={leaf} alt="lilyPad" />
                <img className={classes.lock} src={lock} alt="lock" />
              </>

            }

          </div>
        )
        )}

      </div>
      <Footer />
    </>
  );


};

export default FiveLeafNodes;

