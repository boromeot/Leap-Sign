import ReactPlayer from 'react-player/youtube';
import classes from '../styles/HomeTextVideo.module.css';


function HomeTextVideo(props) {

    const cardClasses = props.isActive
    ? `${classes.homeTextVideoDiv} ${classes.active} `
    : `${classes.homeTextVideoDiv} ${classes.hidden} `; 

    const videoCloseFunction = () => {
      props.videoClose();
    }
    
    // const videoOnStartFunction = () => {
    //   if (props.playerRef.current) {
    //     props.playerRef.current.seekTo(0);
    //   };
    // }

    

    return (
    <div className={classes.homeTextVideoContainer}>
      <div className={cardClasses}>
        <div className={classes.hometext}>
          <h2>{props.title}</h2>
          <p>{props.text}</p>
        </div>
        <div className={classes.homevideo}>
          <ReactPlayer 
            url={props.url} 
            controls 
            width='100%' 
            height='100%' 
            onPlay={props.videoPlay}
            onEnded={videoCloseFunction}
            ref={props.playerRef}
            stopOnUnmount={true}
            />
        </div>
      </div>
    </div>
    );
  }

export default HomeTextVideo;
