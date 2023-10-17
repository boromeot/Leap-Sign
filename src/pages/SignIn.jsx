import { useState } from 'react'
import '../styles/signup.css'

const SignIn = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const errorsObj = {};

    if (!username) {
      errorsObj.username = 'Username is required';
    }

    if (!password) {
      errorsObj.password = 'Password is required';
    }

    setErrors(errorsObj);
  }

  return (
    <div className='signup-container'>
      <form onSubmit={handleSubmit}>
        {(isSubmitting && errors.username) && <p>{errors.username}</p>}
        <label>
          Username:
          <input minLength={1} maxLength={25} type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        {(isSubmitting && errors.password) && <p>{errors.password}</p>}
        <label>
          Password:
          <input minLength={8} maxLength={25} type='text' value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default SignIn
