// eslint-disable-next-line no-unused-vars
import React from 'react';

const userMock = {
  userId: '91491',
  userName: 'Pen4o',
  permissions: [],
  exp: '',
};

const useLogin = () => {
  const loginUser = ({ userName }) => {
    if (userName === userMock.userName) {
      return userMock;
    }

    return null;
  };

  return loginUser;
};

export { useLogin };
