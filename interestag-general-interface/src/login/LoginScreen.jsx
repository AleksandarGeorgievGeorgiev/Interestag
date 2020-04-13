import React from 'react';
import LoginForm from './LoginForm';


function LoginScreen({ handleLoginSubmit }) {
  return (
    <LoginForm handleLoginSubmit={handleLoginSubmit} />
  );
}

export default LoginScreen;
