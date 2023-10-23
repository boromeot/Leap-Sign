import ReactPlayer from 'react-player/youtube';
import classes from '../styles/HomeTextVideo.module.css';

function HomeTextVideo(props) {
    return (
        <>
        <div className={classes.homeTextVideoContainer}>
            <div className={classes.homeTextVideoDiv}>
                <div className={classes.hometext}>
                    {props.text}
                </div>
                <div className={classes.homevideo}>
                    <ReactPlayer url={props.url} controls width='100%' height='100%' />
                </div>
            </div>
        </div>

        </>
    )
}


export default HomeTextVideo;
