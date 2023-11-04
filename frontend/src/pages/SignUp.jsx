import { useState } from 'react';
import * as sessionActions from "../store/session";
import { useDispatch, useSelector } from "react-redux";
import { redirect } from 'react-router-dom';
import '../styles/signup.css'
import { restoreUser} from '../store/session';

const SignUp = (props) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({})
  // const [isSubmitting, setIsSubmitting] = useState(false)

  // if (sessionUser) return redirect('/');

  const isEmail = (email) => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setIsSubmitting(true);

    const errorsObj = {};
    if (!isEmail(email)) errorsObj.email = 'Please enter a valid email';
    if (confirmPassword !== password) errorsObj.confirmPassword = 'Please confirm your password';

    if (Object.keys(errorsObj).length > 0) {
      setErrors(errorsObj);
      return; // Stop execution if there are errors
    }

    if (password === confirmPassword) {
      try {
        setErrors({});
        await dispatch(
          sessionActions.signup({
            email,
            username,
            password,
          })
        );
        // Close the modal only on successful sign-up
        props.closeModal();
      } catch (res) {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      }
    } else {
      setErrors({
        confirmPassword: 'Confirm Password field must be the same as the Password field',
      });
    }

    dispatch(restoreUser());
  };


  return (
    <div className='signup-container' style={{paddingBottom: "2rem"}}>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
          {errors.username && <p className='error'>{errors.username}</p>}
          <label>
            Username:
            <input required type='text' minLength={4} maxLength={25} value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          {errors.email && <p className='error'>{errors.email}</p>}
         <label>
            Email:
            <input required type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
         </label>
          {errors.password && <p className='error'>{errors.password}</p>}
          <label>
            Password:
            <input required type='password' minLength={6} maxLength={25} value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          {errors.confirmPassword && <p className='error'>{errors.confirmPassword}</p>}
          <label>
            Confirm Password:
            <input required type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </label>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default SignUp
