import React, { useContext } from 'react';
import { UserContext } from '../user-context/UserContextProvider';
import CreateIcon from '@material-ui/icons/Create';

import axios from 'axios';

const Profile = () => {
  const { currentUser } = useContext(UserContext);
  //създаваш  array с много обекти, които да се показват след като им дадеш нужните данни => {един обект}
  const events = [{id:1, name:"KubeCon", date:"21 Sep 2020"},{id:2, name:"Woman in Tech", date:"26 Oct 2020"},{id:3, name:"Na baba ti v nosa", date:"23 Jan 2021"}]

  

  return (
<div className="body">
    <div>
      <div> 
      <img className="profilepic" src="../Images/me.jpg"/>
      </div>
    <div className="name"> Alekssandra Belcheva </div>
    <div className="username"> username: {currentUser.username} </div>
      {/* взимаш array-я и мъ "мапваш" пропъртитата на обекта */}
    {events.map(item => (
      <div className="eventBox">
        <div className="date">{item.date}</div>
        <div className="eventName">{item.name}</div>
        <button className="edit"> {<CreateIcon />}</button>
      </div>
    ))
    }         
  </div> 
</div>
  );
};

export { Profile };
