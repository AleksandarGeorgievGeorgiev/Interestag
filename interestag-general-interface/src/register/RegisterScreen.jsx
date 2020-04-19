import React from 'react';

import { RegisterForm } from './RegisterForm';
import Header from '../core/Header';

function RegisterScreen() {
  return (
    <div className="body">
      <Header />
      <br />
      <RegisterForm />
    </div>
  );
}

export { RegisterScreen };
