import React, { useState, useEffect, useRef } from 'react';
import HomeTextVideo from '../components/HomeTextVideo';
import Footer from '../components/footer';
import classes from '../styles/home.module.css';
import '../styles/home.css';

const title1 = 'Why Learning Sign Language?'
// const title2 = 'Welcome to LeapSign! Where AI and Machine Learning meet the world of sign language.';
const title3 = 'Interactive Sign Language Courses';
const text1 = "There are numerous compelling reasons to learn sign language. It can improve communication, foster inclusivity, and open doors to various opportunities. Whether it's for personal growth, career prospects, cultural awareness, or travel benefits, sign language is a universal language that connects us all. Start your journey to create a more inclusive society!";
const text2 = "Our app offers a holistic approach to education, with AI providing personalized lessons and real-time feedback. Join us on this exciting journey and let's unlock the world of communication together!";
const text3 = "Dive into our extensive library of interactive sign language courses. Learn at your own pace, from the comfort of your home, and track your progress as you go. Experience the flexibility and effectiveness of our courses today!";

const video1 = 'https://www.youtube.com/shorts/TYC8mCQ9E14';
const video2 = 'https://www.youtube.com/shorts/frNyrr7RRWU';
const video3 = 'https://www.youtube.com/shorts/Fcd4UQQc8ZE';


const HomePage = () => {
  const title2 = <p className={classes.title2}>Welcome to <span>LeapSign</span>! Where AI and Machine Learning meet the world of sign language.'</p>;

  const [activeCard, setActiveCard] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(false);

  const cardsData = [
    { title: title1, text: text1, url: video1 },
    { title: title2, text: text2, url: video2 },
    { title: title3, text: text3, url: video3 },
  ];

  const playerRefs = cardsData.map(() => useRef(null));

  let interval;

  const handleCardChange = (event) => {
    if (playerRefs[activeCard].current) {
      playerRefs[activeCard].current.seekTo(0);
    }

    clearInterval(interval);
    setActiveCard(Number(event.target.value));
    setVideoPlaying(false);
  };


  const handleVideoPlay = () => {
    // console.log('handleVideoPlay invoked....');
    setVideoPlaying(true);
  };

  const handleVideoClose = () => {

    setVideoPlaying(false);
  };

  // console.log('out of handleVideoClose function');


  useEffect(() => {
    interval = setInterval(() => {
      if(!videoPlaying) {
        setActiveCard((prevActiveCard) => (prevActiveCard + 1) % cardsData.length);
      }
    }, 8000);

    return () => {
      clearInterval(interval);
    }
  }, [cardsData, videoPlaying]);


  return (
    <div className='home-container'>

    {/* <div className={classes.carouselContainer}> */}
    {/* <div id="particles-js"> */}
      <div className='slogan-container'>
        <h1 className='slogan'><span className='nav-logo slogan-logo'>Leapsign</span>: Where Gestures Speak Louder!</h1>
      </div>
      <div className={classes.homeTextVideoContainer}>
        {cardsData.map((data, index) => (
          <HomeTextVideo
            key={index}
            title={data.title}
            text={data.text}
            url={data.url}
            isActive={index === activeCard}
            videoPlay={handleVideoPlay}
            videoClose={handleVideoClose}
            playerRef={playerRefs[index]}
          />
        ))}
      </div>
    {/* </div> */}

    <div className={classes.radioButtons}>
            {cardsData.map((_, index) => (
              <label key={index} className={classes.radioLabel}>
                <input
                  type="radio"
                  name="cardSelector"
                  value={index}
                  checked={index === activeCard}
                  onChange={handleCardChange}
                  className={classes.radioBtn}
                />
              </label>

            ))}
    </div>
    {/* </div> */}

    <Footer />


    </div>
  );
};

export default HomePage;
