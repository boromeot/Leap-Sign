import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import * as sessionActions from "../store/session";


function ProfileButton (props) {

    // const sessionUser = useState(state => state.sessionUser.user);
    // console.log('session user in ProfileButton component: ', sessionUser);

    const dispatch = useDispatch();

    function logout() {
        dispatch(sessionActions.logout());
      }
    

    return (
        <>
        <div>
            <p>{props.sessionUser.username}</p>
            <Link to='/lessons'>Lessons</Link>
            <button onClick={logout}>Log Out</button>
        </div>
        </>
    )
}


export default ProfileButton;