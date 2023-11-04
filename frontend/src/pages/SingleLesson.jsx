import React, { useState, useEffect } from 'react';
import classes from '../styles/SingleLesson.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import FrogAnimation from './FrogAnimation';
import {unlockLesson} from '../store/lesson'
import { useDispatch ,useSelector} from 'react-redux';
import { userLessons } from '../store/lesson';
import '../styles/SingleLesson.css';
import Camera from '../components/Camera';
import ReactPlayer from 'react-player';
import lessons from '../utils/lessons';

export default function lesson() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { id } = useParams();
  console.log('typeof id', typeof id)
  console.log(parseInt(id),"USEPARAMS ID");

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
  }, [currentIndex]);

  function matchFunction() {
    if (!debounceTimeout) {
      debounceTimeout = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % lessons[parseInt(id)].words.length);
        debounceTimeout = null;
      }, 1000); // Adjust the delay as needed (e.g., 1000ms = 1 second)
    }
  }


  return (
      <>

      {/* <FormControlLabel
        control={<Checkbox checked={checked} onChange={handleChange} onClick={handleClick} />}
        label="Mark as completed"
      /> */}   
      <div className='singleLesson-cotainer'>
      <div className='singleLesson-video'>        
        <h1>Current sign : {currentWord}</h1>
        <ReactPlayer 
          url={`https://www.youtube.com/watch?v=${currentId}`}
          loop={true}
          playing={true}
          muted={true}
        />
      </div>
      {/* <div className='singleLesson-camera'>
        <Camera word={currentWord} threshold={0.9} matchFunction={matchFunction} />
      </div> */}
    </div>

      <div>
        {parseInt(id) === 6 ? 
          <p>You've finished all lessons!</p> 
          :
          <button onClick={navigateBackToLessons}>
            Continue
          </button>
        }
      </div>

      </>
  )

}

