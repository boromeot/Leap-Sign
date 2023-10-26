import { useState } from 'react'
import * as sessionActions from "../store/session";
import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
import '../styles/SignIn.css';

const SignIn = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    dispatchEvent(sessionActions.login({ username, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    )

    if (Object.keys(errors).length === 0) {
      // setIsSubmitting(true);
      props.closeModal();
    }
  }

  return (
    <div className='signin-container'>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input required minLength={1} maxLength={25} type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
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
