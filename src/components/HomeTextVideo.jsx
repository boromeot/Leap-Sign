import ReactPlayer from 'react-player/youtube';
import classes from '../styles/HomeTextVideo.module.css';

// function HomeTextVideo(props) {
//     return (
//         <>
//         <div className={classes.homeTextVideoContainer}>
//             <div className={classes.homeTextVideoDiv}>
//                 <div className={classes.hometext}>
//                     <h2>{props.title}</h2>
//                     <p>{props.text}</p>
//                 </div>
//                 <div className={classes.homevideo}>
//                     <ReactPlayer url={props.url} controls width='100%' height='100%' />
//                 </div>
//             </div>
//         </div>

//         </>
//     )
// }

function HomeTextVideo(props) {
    const cardClasses = props.isActive
    ? `${classes.homeTextVideoDiv} ${classes.active} ${classes.transitionCard}`
    : `${classes.homeTextVideoDiv} ${classes.hidden} ${classes.transitionCard}`; 

  
    return (
      <div className={cardClasses}>
        <div className={classes.hometext}>
          <h2>{props.title}</h2>
          <p>{props.text}</p>
        </div>
        <div className={classes.homevideo}>
          <ReactPlayer url={props.url} controls width='100%' height='100%' />
        </div>
      </div>
    );
  }

export default HomeTextVideo;
