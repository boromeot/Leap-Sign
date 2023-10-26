import { useState } from 'react'
import * as sessionActions from "../store/session";
import { useDispatch, useSelector } from "react-redux";
import '../styles/signup.css'

const SignUp = (props) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isEmail = (email) => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const errorsObj = {};
    if (!isEmail(email)) errorsObj.email = 'Please enter a valid email';
    if (confirmPassword !== password) errorsObj.confirmPassword = 'Please confirm your password';

    setErrors(errorsObj);

    props.closeModal();
  }

  return (
    <div className='signup-container' style={{paddingBottom: "2rem"}}>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>

          <label>
            Username:
            <input required type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          {/* <label>
            First Name:
            <input required type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </label>
          <label>
            Last Name:
            <input required type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </label> */}

         <label>
            Email:
            <input required type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
         </label>
          {(isSubmitting && errors.email) && <p className='error'>{errors.email}</p>}

          <label>
            Password:
            <input required type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          {(isSubmitting && errors.confirmPassword) && <p className='error'>{errors.confirmPassword}</p>}
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
