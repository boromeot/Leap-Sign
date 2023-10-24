import React, { useState, useEffect } from 'react';
import HomeTextVideo from '../components/HomeTextVideo';
import Footer from '../components/footer';
import classes from '../styles/home.module.css';

const title1 = 'Why Learning Sign Language?'
const title2 = 'Welcome to [app name]! Where AI and Machine Learning meet the world of sign language.';
const title3 = 'Interactive Sign Language Courses';
const text1 = "There are numerous compelling reasons to learn sign language. It can improve communication, foster inclusivity, and open doors to various opportunities. Whether it's for personal growth, career prospects, cultural awareness, or travel benefits, sign language is a universal language that connects us all. Start your journey to create a more inclusive society!";
const text2 = "Our app offers a holistic approach to education, with AI providing personalized lessons and real-time feedback. Join us on this exciting journey and let's unlock the world of communication together!";
const text3 = "Dive into our extensive library of interactive sign language courses. Learn at your own pace, from the comfort of your home, and track your progress as you go. Experience the flexibility and effectiveness of our courses today!";

const video1 = 'https://www.youtube.com/shorts/TYC8mCQ9E14';
const video2 = 'https://www.youtube.com/shorts/frNyrr7RRWU';
const video3 = 'https://www.youtube.com/shorts/Fcd4UQQc8ZE';


const HomePage = () => {
  const [activeCard, setActiveCard] = useState(0);

  const handleCardChange = (event) => {
    setActiveCard(Number(event.target.value));
  };

  const cardsData = [
    { title: title1, text: text1, url: video1 },
    { title: title2, text: text2, url: video2 },
    { title: title3, text: text3, url: video3 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prevActiveCard) => (prevActiveCard + 1) % cardsData.length);
    }, 10000)

    return () => {
      clearInterval(interval);
    }
  }, [cardsData]);

  return (
    <>
    
    <div className={classes.carouselContainer}>
      <div className={classes.homeTextVideoContainer}>
        {cardsData.map((data, index) => (
          <HomeTextVideo
            key={index}
            title={data.title}
            text={data.text}
            url={data.url}
            isActive={index === activeCard}
          />
        ))}
      </div>
    </div>

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

    <Footer />

    </>
  );
};

export default HomePage;
