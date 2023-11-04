import { useState } from 'react'
import * as sessionActions from "../store/session";
import { useDispatch, useSelector } from "react-redux";
// import { clearLessons } from '../store/lesson';
import '../styles/SignIn.css';
import { userLessons, clearLessons } from '../store/lesson';

const SignIn = (props) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // if (sessionUser) return redirect('/');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      const user = {
        credential: username,
        password,
      }

      await dispatch(sessionActions.login(user));
      props.closeModal();
    } catch (error) {
      const data = await error.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
    }
  }

  return (
    <div className='signin-container'>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        {errors.credential && <p className='error'>{errors.credential}</p>}
        <label>
          Username:
          <input required minLength={4} maxLength={25} type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input required minLength={8} maxLength={25} type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default SignIn
