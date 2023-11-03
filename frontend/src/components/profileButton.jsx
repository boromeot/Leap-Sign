
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import * as sessionActions from "../store/session";
import { clearLessons } from '../store/lesson';
import classes from '../styles/ProfileButton.module.css';


function ProfileButton (props) {

    // const sessionUser = useState(state => state.sessionUser.user);
    // console.log('session user in ProfileButton component: ', sessionUser);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function logout(e) {
        e.preventDefault();
        await dispatch(clearLessons());
        console.log("clear lesson state in logout function~~~~~");
        await dispatch(sessionActions.logout());
        
        navigate('/');
      }
    
    return (
        <>
        <div className={classes.profileButton}>
            <p>Hi, {props.sessionUser.username}!</p>
            <Link to='/lessons'>Lessons</Link>
            <button onClick={logout}>Log Out</button>
        </div>
        </>
    )
}


export default ProfileButton;