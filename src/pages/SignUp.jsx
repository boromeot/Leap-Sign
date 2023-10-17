import { useState } from 'react'
import '../styles/signup.css'

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  return (
    <div className='signup-container'>
      <form>
        <label>
          Username:
          <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Email:
          <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type='text' value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label>
          Confirm Password:
          <input type='text' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </label>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default SignUp
