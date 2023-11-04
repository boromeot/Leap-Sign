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
  console.log(id,"USEPARAMS ID");
  let lessonToBeUnlocked = { 
    lessonId: parseInt(id)+1,
    userId: sessionUser.id,
    unlocked: true,
    }


  const navigateBackToLessons = () => {
    dispatch(unlockLesson(lessonToBeUnlocked))
    dispatch(userLessons())
    navigate(`/lessons`, { state: { animate: true, unlock: true } })}

  const [currentIndex, setCurrentIndex] = useState(0);
 
  console.log(lessons[id].words)
  const [currentWord, setCurrentWord] = useState(lessons[id].words[currentIndex]);
  const [currentId, setCurrentId] = useState(lessons[id].youtubeIds[currentIndex]);
  console.log(currentWord)

  let debounceTimeout;

  useEffect(() => {
    setCurrentWord(lessons[id].words[currentIndex]);
    setCurrentId(lessons[id].youtubeIds[currentIndex]);
  }, [currentIndex]);

  function matchFunction() {
    if (!debounceTimeout) {
      debounceTimeout = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % lessons[id].words.length);
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
      <div className='singleLesson-camera'>
        <Camera word={currentWord} threshold={0.9} matchFunction={matchFunction} />
      </div>
    </div>

      <div>
        {id < 6 ? 
          <button onClick={navigateBackToLessons}>
            Continue
          </button>
          :
          <p>You've finished all lessons!</p>
        }
      </div>

      </>
  )

}

