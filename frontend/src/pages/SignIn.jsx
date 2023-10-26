import { useState } from 'react'
import '../styles/SignIn.css';

const SignIn = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    // setIsSubmitting(true);

    props.closeModal();
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
