import React, { useContext, useEffect } from 'react';

import { BrowserRouter, Route, Switch, Redirect, useHistory } from 'react-router-dom';

import { Home } from './home/Home';
import { Profile } from './profile/Profile';
import { LoginScreen } from './login/LoginScreen';
import { RegisterScreen } from './register/RegisterScreen';
import { CreateEventScreen } from './event/CreateEventScreen';
import { DiscoverEventScreen } from './event/DiscoverEventScreen';

import { BottomNavBar } from './core/BottomNavBar';
import AppTopBar from './core/AppTopBar';
import { PrivateRoute } from './user-context/PrivateRoute'
import { UserContext } from './user-context/UserContextProvider';
import { EnforceAnonymousRoute } from './user-context/EnforceAnonymousRoute';
import { LoginForm } from './login/LoginForm';

function App() {
  const testName = 'Welcome to ProEp';
  const { currentUser, isAuthenticated, isLoggedIn } = useContext(UserContext);

  const renderRoutes = () => {
    // if (isAuthenticated()) {
    //   return (
    //     <Switch>
    //       {/* <Route exact path="/" ><Home /></Route>
    //       <Route path="/profile/:id" render={<PrivateRoute component={Profile}/>}></Route> */}
          
    //       <PrivateRoute authed={isAuthenticated()} path="/profile/:id" component={Profile}/>
    //       <PrivateRoute authed={isLoggedIn()} exact path="/" component={Home}/>
    //       {/* <Redirect from="/*" to="/login" /> */}
    //     </Switch>
    //   );
    // }

    return (
      <Switch>
        <PrivateRoute authed={isLoggedIn()} path="/profile/:id" component={Profile}/>
        <PrivateRoute authed={isLoggedIn()} exact path="/" component={Home}/>
        <PrivateRoute authed={isLoggedIn()} path="/event" component={CreateEventScreen}/>
        <Route path="/discover" ><DiscoverEventScreen /></Route> 
        {/* <Route exact path="/" ><Home /></Route> */}
        <EnforceAnonymousRoute authed={isLoggedIn()} path="/login" component={LoginScreen}/>
        <EnforceAnonymousRoute authed={isLoggedIn()} path="/register" component={RegisterScreen}/>
        {/* <Redirect from="/profile/*" to="/login" /> */}
      </Switch>
    );
  };

  return (

    <div className="App">
      <AppTopBar pageName={testName} />
      <br />
      <BrowserRouter>
        {renderRoutes()}
      <BottomNavBar/>
      </BrowserRouter>
    </div>
  );
}

export { App };
