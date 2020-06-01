import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../user-context/UserContextProvider';
import CreateIcon from '@material-ui/icons/Create';
import { useHistory } from 'react-router-dom';

import axios from 'axios';

const Profile = () => {
  const { currentUser } = useContext(UserContext);
  const navigationHistory = useHistory();
  //създаваш  array с много обекти, които да се показват след като им дадеш нужните данни => {един обект}
  //const events = [{id:1, name:"KubeCon", date:"21 Sep 2020"},{id:2, name:"Woman in Tech", date:"26 Oct 2020"},{id:3, name:"Na baba ti v nosa", date:"23 Jan 2021"}]

  //([]) -> Празен array в JavaScript
  const [ownEvents, setOwnEvents] = useState([]);

  //ползваме РЕАКТ функция, я която правим наша функция, в която взимаме local host-a от .env и добавяме endpoint-овете (/api/event/), които взехме от POSTMAN 
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASEURL}/api/event/`)
    // пишем then, защото искаме да разберем какво става след като ни върне успешно изпълнена заявка 
      .then((res) => {
        setOwnEvents(res.data);
      });
  }, []);

  const clickedEvent = (event) => {
    navigationHistory.push({
      pathname: `/event/${event.id}/`, 
      state: { ...event }
    });
  }

  const clickedEventEdit = (event) => {
    navigationHistory.push({
      pathname: `/event/${event.id}/edit`, 
      state: { ...event }
    });
  }

  return (
<div className="body">
    <div>
      <div> 
      <img className="profilepic" src="../Images/me.jpg"/>
      </div>-=
    <div className="name"> Alekssandra Belcheva </div>
    <div className="username"> username: {currentUser.username} </div>
      {/* взимаш array-я и му "мапваш" пропъртитата на обекта */}
    {ownEvents.map(event => (
      <div key={event.id} className="eventBox">
        <div className="date">{new Date(event.event_date).toDateString()}</div>
        <div onClick={() => { clickedEvent(event) }} className="eventName">{event.name}</div>
        <button onClick={() => { clickedEventEdit(event) }} className="edit"> {<CreateIcon />}</button>
      </div>
    ))
    }         
  </div> 
</div>
  );
};

export { Profile };
