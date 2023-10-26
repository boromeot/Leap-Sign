import React, { createContext, useState, useContext } from 'react';
import { csrfFetch } from './csrf';
// Create a new context object
export const SignupContext = createContext({
  username: '',
  setUsername: () => {},
  email: '',
  setEmail: () => {},
  password: '',
  setPassword: () => {},
  confirmPassword: '',
  setConfirmPassword: () => {},
  signUpCall: () => {},
  restoreUser: () => {},
});

const signUpCall = async (user) => {
  const { username, email, password } = user;
  const response = await csrfFetch('/api/users', {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password
    })
  });

  if (response.ok) {
    const data = await response.json();
    console.log(data);
  }
}

const restoreUser = async () => {
  const response = await csrfFetch('/api/session');

  if (response.ok) {
    const data = await response.json();
    console.log("DATA", data);
    return data
  }
  // const data = await response.json();
  // return data;
}

// Export a function that provides access to the context object
export const useSignup = () => useContext(SignupContext);

// Create a provider component that wraps the app
export function SignupProvider({ children }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Define the context value object
  const contextValue = {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    signUpCall,
    restoreUser
  };

  // Render the provider with the context value and any child components
  return (
    <SignupContext.Provider value={contextValue}>
      {children}
    </SignupContext.Provider>
  );
}
