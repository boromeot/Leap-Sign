import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {unlockLesson} from '../store/lesson'
import { useDispatch ,useSelector} from 'react-redux';
import '../styles/SingleLesson.css';
import Camera from '../components/Camera';
import ReactPlayer from 'react-player';
import lessons from '../utils/lessons';
import Footer from '../components/footer';

export default function lesson() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { id } = useParams();
  // console.log('typeof id', typeof id)
  // console.log(parseInt(id),"USEPARAMS ID");
  const [buttonActive, setButtonActive] = useState(false);

  let lessonToBeUnlocked = { 
    lessonId: parseInt(id)+1,
    userId: sessionUser ? (sessionUser.id ? sessionUser.id : null) : null,
    unlocked: true,
  }


  const navigateBackToLessons = () => {
    dispatch(unlockLesson(lessonToBeUnlocked));
    navigate(`/lessons`, { state: { animate: true, unlock: true } })
  }

  const [currentIndex, setCurrentIndex] = useState(0);
 
  // console.log(lessons[parseInt(id)].words)
  const [currentWord, setCurrentWord] = useState(lessons[parseInt(id)].words[currentIndex]);
  const [currentId, setCurrentId] = useState(lessons[parseInt(id)].youtubeIds[currentIndex]);
  console.log(currentWord)

  let debounceTimeout;

  useEffect(() => {
    setCurrentWord(lessons[parseInt(id)].words[currentIndex]);
    setCurrentId(lessons[parseInt(id)].youtubeIds[currentIndex]);
    if(currentIndex >= lessons[parseInt(id)].words.length) {
      setButtonActive(true);
    }
  }, [currentIndex, id]);

  function matchFunction() {
    if (!debounceTimeout) {
      debounceTimeout = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % lessons[parseInt(id)].words.length);
        debounceTimeout = null;
      }, 1000); // Adjust the delay as needed (e.g., 1000ms = 1 second)
    }
  }

  console.log("buttonActive in SingleLesson: ", buttonActive);

  return (
      <>
      
      {/* <FormControlLabel
        control={<Checkbox checked={checked} onChange={handleChange} onClick={handleClick} />}
        label="Mark as completed"
      /> */}   
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
            {/* <Camera word={currentWord} threshold={0.9} matchFunction={matchFunction} /> */}
          </div>
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
              // disabled={buttonActive === false}
            >
              Continue
             
            </button>
          }
        </div>

        <Footer />
      </>
  )

}

