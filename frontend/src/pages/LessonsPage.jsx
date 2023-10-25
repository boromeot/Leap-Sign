import React, { useState, useEffect } from 'react';
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
    const navigate = useNavigate();
    const location = useLocation();
    const [animate, setAnimate] = useState(false);
    const [currentLesson, setCurrentLesson] = useState(0);

    // Define animation properties as state
    const [animationProperties, setAnimationProperties] = useState({
      animationDuration: '2s', // Default duration
      animationTimingFunction: 'ease', // Default timing function
      destinationLeft: 0,
      destinationTop: 0,
    });

    useEffect(() => {
        // Function to calculate and set animation properties
        const calculateAnimationProperties = (lessonNumber) => {
        // Calculate the position of the destination lily pad
        const destinationLilyPad = document.querySelector(`#lilyPad${lessonNumber}`);
        if (destinationLilyPad) {
            const destinationPosition = destinationLilyPad.getBoundingClientRect();
            const containerPosition = document.querySelector('.leafclass').getBoundingClientRect();
            const frogWidth = document.querySelector(`.${classes.frogImg}`).getBoundingClientRect().width;

            // Calculate the position offsets
            const leftOffset = destinationPosition.left - containerPosition.left + (destinationLilyPad.offsetWidth - frogWidth) / 2;
            const topOffset = destinationPosition.top - containerPosition.top;

            // Set animation properties for the frog
            setAnimationProperties({
                animationDuration: '2s', // Set your desired duration
                animationTimingFunction: 'ease', // Set your desired timing function
                destinationLeft: leftOffset,
                destinationTop: topOffset,
            });
        }
        };

        // Get the animate state from localStorage
        const shouldAnimate = localStorage.getItem('animate') === 'true';

        // Set the component's animate state
        setAnimate(shouldAnimate);

        // Call the function to calculate animation properties for the current lesson
        calculateAnimationProperties(currentLesson);
      }, [location, currentLesson]);

      function handleLilyPadClick(lessonNumber) {
        if (lessonNumber === currentLesson + 1) {
          setCurrentLesson(lessonNumber);

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
      }

    return (
      <div className={classes.leafclass}>
        <div className={classes.frogContainer} onClick={() => handleLilyPadClick(1)}>
          {animate && <FrogAnimation animate={animate} />}
          <img
            className={`${classes.frogImg} ${animate ? classes.animation : ''}`}
            src={frogImg}
            alt='FrogLogo'
            style={{
              animationDuration: animationProperties.animationDuration,
              animationTimingFunction: animationProperties.animationTimingFunction,
              left: animationProperties.destinationLeft,
              top: animationProperties.destinationTop,
            }}
          />
          {leafnode()}
        </div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div className={classes.lessonsLilyPad} id={`lilyPad2`} key={i} onClick={() => handleLilyPadClick(i)}>
            {i <= currentLesson ? (
              <>
                {animate && <FrogAnimation animate={animate} />}
                <img
                  className={`${classes.frogImg} ${animate ? classes.animation : ''}`}
                  src={frogImg}
                  alt='FrogLogo'
                />
                {leafnode()}
              </>
            ) : (
              <img className={classes.gray} src={leaf} alt="lilyPad" />
            )}
          </div>
        ))}
      </div>
    );
};

export default FiveLeafNodes;

// const FiveLeafNodes = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const [animate, setAnimate] = useState(false);
//     const [currentLesson, setCurrentLesson] = useState(0);
//     const [animationProperties, setAnimationProperties] = useState({
//         animationDuration: '2s', // Default duration
//         animationTimingFunction: 'ease', // Default timing function
//         destinationLeft: 0,
//         destinationTop: 0,
//       });


//     function handleLilyPadClick(lessonNumber) {
//         if (lessonNumber === currentLesson + 1) {
//             setCurrentLesson(lessonNumber);
//         }

//         // Calculate the position of the destination lily pad
//         const destinationLilyPad = document.querySelector(`#lilyPad${lessonNumber}`);
//         if (destinationLilyPad) {
//         const destinationPosition = destinationLilyPad.getBoundingClientRect();
//         const containerPosition = document.querySelector('.leafclass').getBoundingClientRect();

//         // Calculate the position offsets
//         const leftOffset = destinationPosition.left - containerPosition.left;
//         const topOffset = destinationPosition.top - containerPosition.top;

//         // Set animation properties for the frog
//         setAnimationProperties({
//           animationDuration: '2s', // Set your desired duration
//           animationTimingFunction: 'ease', // Set your desired timing function
//           destinationLeft: leftOffset,
//           destinationTop: topOffset,
//         });

//         // Trigger the animation
//         setAnimate(true);

//             // Set animate to 'true' in localStorage
//             localStorage.setItem('animate', 'true');

//             // Navigate to a different page
//             navigate(`/lessons/${lessonNumber}`);

//             // Set animate back to 'false' after 2 seconds to stop the animation
//             setTimeout(() => {
//                 localStorage.setItem('animate', 'false');
//                 setAnimate(false);
//             }, 2000);
//         }
//     }

//     useEffect(() => {
//         // Get the animate state from localStorage
//         const shouldAnimate = localStorage.getItem('animate') === 'true';

//         // Set the component's animate state
//         setAnimate(shouldAnimate);

//     }, [location]);


//     return (
//         <div className={classes.leafclass}>
//             <div className={classes.frogContainer} onClick={() => handleLilyPadClick(1)}>
//                 {animate && <FrogAnimation animate={animate} />}
//                 <img
//                     className={`${classes.frogImg} ${animate ? classes.animation : ''}`}
//                     src={frogImg}
//                     alt='FrogLogo'
//                     style={{
//                         animationDuration: animationProperties.animationDuration,
//                         animationTimingFunction: animationProperties.animationTimingFunction,
//                         left: animationProperties.destinationLeft,
//                         top: animationProperties.destinationTop,
//                       }}
//                 />

//                 {leafnode()}
//             </div>
//             {[1, 2, 3, 4, 5].map((i) => (
//                 <div className={classes.lessonsLilyPad} key={i} onClick={() => handleLilyPadClick(i)}>
//                     {i <= currentLesson ? (
//                         <>
//                             {animate && <FrogAnimation animate={animate} />}
//                             <img
//                                 className={`${classes.frogImg} ${animate ? classes.animation : ''}`}
//                                 src={frogImg}
//                                 alt='FrogLogo'
//                             />
//                             {leafnode()}
//                         </>
//                     ) : (
//                         <img className={classes.gray} src={leaf} alt="lilyPad" />
//                     )}
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default FiveLeafNodes;


// const FiveLeafNodes = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const query = new URLSearchParams(location.search);
//     const shouldAnimate = query.get("animate") === "true";
//     const [animate, setAnimate] = useState(false);
//     const [unlocked, setUnlocked] = useState(false);
//     const [currentLesson, setCurrentLesson] = useState(0); // Initialize the current lesson to 1


//     // useEffect(() => {
//     //     if (shouldAnimate) {
//     //         setAnimate(true);
//     //         setUnlocked(true);
//     //     }
//     // }, [shouldAnimate])
//     useEffect(() => {
//         if (animate) {
//             setUnlocked(true);
//         }
//     }, [animate]);
//     function handleClick() {
//         if (currentLesson < 5) {
//             setCurrentLesson(currentLesson + 1);
//         }
//     }
//     function lessonnode(i, shouldDisplayFrog) {
//     const handleLilyPadClick = () => {
//         navigate(`/lessons/${i}`);
//     };

//     return (
//         <div onClick={handleLilyPadClick}>
//             {shouldDisplayFrog && animate && <FrogAnimation animate={animate} />}
//             {/* {shouldDisplayFrog && <img className={`${classes.frogImg} ${animate ? classes.animate : classes.frogImg}`} src={frogImg} alt='FrogLogo' /> }{leafnode()} */}
//             {/* Add the content of the lesson here */}
//         </div>
//     );
// }

// // ...

// return (
//     <div className={classes.leafclass}>
//         <div className={classes.frogContainer} onClick={handleClick}>
//             {animate && <FrogAnimation animate={animate} />}
//             <img className={`${classes.frogImg} ${animate ? classes.animate : classes.frogImg}`} src={frogImg} alt='FrogLogo' />
//             {lessonnode(currentLesson, false)}{leafnode()} {/* Do not display the frog on the frog container */}
//         </div>
//         {[1, 2, 3, 4].map((i) => (
//             <div className={classes.lessonsLilyPad} key={i}>
//                 {i <= currentLesson ? lessonnode(i, true) : <img className={classes.gray} src={leaf} alt="lilyPad" />}
//             </div>
//         ))}
//     </div>
// );



// }

// export default FiveLeafNodes;
// function handleClick() {
    //     if (currentLesson < 5) {
    //         setCurrentLesson(currentLesson + 1); // Move the frog forward
    //     }
// }
// function lessonnode(i) {
//     // Define your lesson content based on its index (i)
//     return (
//         <div>
//             {  navigate(`/lessons/${i}`)}
//             {/* <h3>Lesson {i}</h3> */}
//             {/* Add the content of the lesson here */}
//         </div>
//     );
// }
// function lessonnode(i, shouldDisplayFrog) {
//     return (
//         <div>
//             {shouldDisplayFrog && animate && <FrogAnimation animate={animate} />}
//             {shouldDisplayFrog && <img className={`${classes.frogImg} ${animate ? classes.animate : classes.frogImg}`} src={frogImg} alt='FrogLogo' />}
//             {  navigate(`/lessons/${i}`)}
//             {/* Add the content of the lesson here */}
//         </div>
//     );
// }
// return (
//     <div className={classes.leafclass}>
//         <div className={classes.frogContainer} onClick={handleClick}>
//             {animate && <FrogAnimation animate={animate}/>}
//             <img className={`${classes.frogImg} ${animate ? classes.animate : classes.frogImg}`} src={frogImg} alt='FrogLogo' />
//             {lessonnode(currentLesson)}{leafnode()}
//         </div>
//         {/* {[1, 2, 3, 4,5].map((i) => (
//             <div className={classes.lessonsLilyPad} key={i}>
//                 {i <= currentLesson ? lessonnode(i) : <img className={classes.gray} src={leaf} alt="lilyPad" />}
//             </div>
//         ))} */}
//         {[1, 2, 3, 4].map((i) => (
//             <div className={classes.lessonsLilyPad} key={i}>
//                 {i <= currentLesson ? lessonnode(i, true) : <img className={classes.gray} src={leaf} alt="lilyPad" />}
//             </div>
//         ))}
//     </div>
// );
// function handleClick1() {
//     navigate(`/lessons/1`);
// }
// function handleClick2() {
//     navigate(`/lessons/2`);
// }
// function handleClick3() {
//     navigate(`/lessons/3`);
// }
// function handleClick4() {
//     navigate(`/lessons/4`);
// }
// function handleClick5() {
//     navigate(`/lessons/5`);
// }

// function generateElements(length) {
//     const elements = [];

//     for (let i = 0; i < length; i++) {
//         console.log("Clicking"+i)
//         elements.push(
//             <div className={classes.lessonsLilyPad} key={i}   onClick={() => handleClick(i)} >

//                 {unlocked ? leafnode() : <img className={classes.gray} src={leaf} alt="lilyPad" />}
//             </div>
//         );
//     }

//     return elements;
// }

// // Usage:
// return (
//     <div className={classes.leafclass}>
//         <div className={classes.frogContainer} >
//             {animate && <FrogAnimation animate={animate}/>}
//             <img className={`${classes.frogImg} ${animate ? classes.animate : classes.frogImg}`} src={frogImg} alt='FrogLogo' />
//             {leafnode()}
//         </div>
//         {generateElements(5)} {/* Call the function with the desired length */}
//     </div>
// );


// return (
//     <div className={classes.leafclass}>
//         <div className={classes.frogContainer} onClick={handleClick1} >
//             {animate && <FrogAnimation animate={animate}/>}
//             <img className={`${classes.frogImg} ${animate ? classes.animate : classes.frogImg}`} src={frogImg} alt='FrogLogo' />
//             {/* <img className={`${classes.frogImg} `} src={frogImg} alt='FrogLogo' /> */}
//            {leafnode()}
//         </div>

//         <div className={classes.frogContainer} onClick={handleClick2}>
//             {unlocked ? (
//                 leafnode()
//             ) : (
//                 <img className={classes.gray} src={leaf} alt="lilyPad" />
//             )}
//         </div>
//         <div className={classes.lessonsLilyPad} onClick={handleClick3}>
//             {unlocked ? (
//                 leafnode()
//             ) : (
//                 <img className={classes.gray} src={leaf} alt="lilyPad" />
//             )}
//         </div>
//         <div className={classes.lessonsLilyPad} onClick={handleClick4}>
//             {unlocked ? (
//                 leafnode()
//             ) : (
//                 <img className={classes.gray} src={leaf} alt="lilyPad" />
//             )}
//         </div>
//         <div className={classes.lessonsLilyPad}onClick={handleClick5}>
//             {unlocked ? (
//                 leafnode()
//             ) : (
//                 <img className={classes.gray} src={leaf} alt="lilyPad" />
//             )}
//         </div>

//     </div>
// )
