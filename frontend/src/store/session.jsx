import React, { createContext, useState, useContext } from 'react';

// Create a new context object
export const SignupContext = createContext({
  username: '',
  setUsername: () => {},
  firstName: '',
  setFirstName: () => {},
  lastName: '',
  setLastName: () => {},
  email: '',
  setEmail: () => {},
  password: '',
  setPassword: () => {},
  confirmPassword: '',
  setConfirmPassword: () => {},
});

// Export a function that provides access to the context object
export const useSignup = () => useContext(SignupContext);

// Create a provider component that wraps the app
export function SignupProvider({ children }) {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Define the context value object
  const contextValue = {
    username,
    setUsername,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
  };

  // Render the provider with the context value and any child components
  return (
    <SignupContext.Provider value={contextValue}>
      {children}
    </SignupContext.Provider>
  );
}
