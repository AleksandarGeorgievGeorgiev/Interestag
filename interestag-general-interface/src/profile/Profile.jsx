import React, { useContext } from 'react';
import { UserContext } from '../user-context/UserContextProvider';

const Profile = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="body">
      <h1>Profile</h1>
      {currentUser.username}
    </div>

  );
};

export { Profile };
