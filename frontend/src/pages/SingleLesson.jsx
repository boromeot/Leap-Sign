import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {unlockLesson} from '../store/lesson'
import { useDispatch ,useSelector} from 'react-redux';
import '../styles/SingleLesson.css';
import CameraComponent from '../components/Camera';
import ReactPlayer from 'react-player';
import lessons from '../utils/lessons';
import Footer from '../components/footer';

export default function lesson() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { id } = useParams();
  const [buttonActive, setButtonActive] = useState(false);

  let lessonToBeUnlocked = { 
    lessonId: parseInt(id)+1,
    userId: sessionUser ? (sessionUser.id ? sessionUser.id : null) : null,
    unlocked: true,
  }


  const navigateBackToLessons = () => {
    if (buttonActive) {
      dispatch(unlockLesson(lessonToBeUnlocked));
      navigate(`/lessons`, { state: { animate: true, unlock: true } })
    }
  }

  const [currentIndex, setCurrentIndex] = useState(0);
 
  const [currentWord, setCurrentWord] = useState(lessons[parseInt(id)].words[currentIndex]);
  const [currentId, setCurrentId] = useState(lessons[parseInt(id)].youtubeIds[currentIndex]);

  let debounceTimeout;

  useEffect(() => {
    setCurrentWord(lessons[parseInt(id)].words[currentIndex]);
    setCurrentId(lessons[parseInt(id)].youtubeIds[currentIndex]);
    if(currentIndex >= lessons[parseInt(id)].words.length) {
      setButtonActive(true);
    }
  }, [currentIndex, id]);

  function matchFunction() {
    /* The matchFunction fires when the LSTM model's detection matches the currentWord at a confindence rating > threshold*/
    if (!debounceTimeout) {
      debounceTimeout = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1));
        debounceTimeout = null;
      }, 1000); // Adjust the delay as needed (e.g., 1000ms = 1 second)
    }
  }

  return (
    <>
      <div className='singleLesson-cotainerouter'>
        <h1>Lesson {id}: <span>{`${lessons[parseInt(id)].words}`}</span></h1>
        <div  className='singleLesson-cotainer'>
          <div className='singleLesson-video'>        
            <h1>Current sign : <span>{currentWord}</span></h1>
            <ReactPlayer 
              url={`https://www.youtube.com/watch?v=${currentId}`}
              loop={true}
              playing={true}
              muted={true}
              width="100%"
              height="350px"
            />
          </div>
          <div className='singleLesson-camera'>
            <CameraComponent word={currentWord} threshold={0.8} matchFunction={matchFunction} />
          </div>
        </div>
    
        <div className='continue-button'>
          {parseInt(id) === 6 ? 
            <div>
              {buttonActive ? <p id='lesson6'>You've completed all lessons! 🙌🥳🎉</p> : null}
            </div>
            :
            <button 
              onClick={navigateBackToLessons} 
              className={buttonActive ? 'button-active' : 'not-active'}
              disabled={buttonActive === false}
            >
              Continue
             
            </button>
          }
        </div>
      </div>
      <Footer />
    </>
  )

}

