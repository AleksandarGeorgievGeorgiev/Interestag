import React, { useContext, useState, useEffect } from 'react';

import { UserContext } from '../user-context/UserContextProvider';
import CreateIcon from '@material-ui/icons/Create';
import { useHistory } from 'react-router-dom';

import { useProtectedApi } from '../core/useProtectedApi';

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Ripples from "react-ripples";
import {Box} from "@material-ui/core"

const Profile = () => {
  const { currentUser } = useContext(UserContext);
  const navigationHistory = useHistory();
  const protectedApi = useProtectedApi();
  //създаваш  array с много обекти, които да се показват след като им дадеш нужните данни => {един обект}
  //const events = [{id:1, name:"KubeCon", date:"21 Sep 2020"},{id:2, name:"Woman in Tech", date:"26 Oct 2020"},{id:3, name:"Na baba ti v nosa", date:"23 Jan 2021"}]

  //([]) -> Празен array в JavaScript
  const [ownEvents, setOwnEvents] = useState([]);

  //ползваме РЕАКТ функция, я която правим наша функция, в която взимаме local host-a от .env и добавяме endpoint-овете (/api/event/), които взехме от POSTMAN
  useEffect(() => {
    protectedApi.get(`${process.env.REACT_APP_BASEURL}/api/event/`)
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
      </div>
    <div className="username"> Username: {currentUser.username} </div>
      {/* взимаш array-я и му "мапваш" пропъртитата на обекта */}
    {ownEvents.map(event => (
      <Card key={event.id} style={{ marginTop: "10px" }}>
        <div className="going-to-items">
          <Ripples>
            <CardContent onClick={() => clickedEvent(event)}>
              <Box display="flex" justifyContent="center">
                <div>{event.name} | {new Date(event.event_date).toDateString()}</div>
              </Box>
            </CardContent>
          </Ripples>
        </div>
      </Card>
    ))
    }
  </div>
</div>
  );
};

export { Profile };
