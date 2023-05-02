import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
// import LoginFormPage from './components/LoginFormPage';
// import SignupFormPage from './components/SignupFormPage';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import AllSpots from './components/Spots/AllSpots';
import SpotDetails from './components/Spots/SpotDetails';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);



  return isLoaded && (
    <>
    <Navigation isLoaded={isLoaded} />
    {isLoaded && 
    <Switch>
      <Route exact path={'/'}>
        <AllSpots />
      </Route>
      <Route exact path={'/spots/:spotId'}>
        <SpotDetails />
      </Route>
      </Switch>}
    </>
  );
}

export default App;
