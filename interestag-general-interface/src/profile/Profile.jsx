import React, { useContext } from 'react';
import { UserContext } from '../user-context/UserContextProvider';

const Profile = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div>
      <h1>Profile</h1>
      {currentUser.userId && currentUser.userName}
    </div>

  );
};

export { Profile };
