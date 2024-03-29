import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
// import LoginFormPage from './components/LoginFormPage';
// import SignupFormPage from './components/SignupFormPage';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import AllSpots from './components/Spots/AllSpots';
import SpotDetails from './components/Spots/SpotDetails';
import CreateSpotForm from './components/Spots/CreateSpot';
import EditSpotForm from './components/Spots/UpdateSpot';
import ManageSpots from './components/Spots/ManageSpots';
import Footer from './components/Footer';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);



  return (
    <>
    <Navigation isLoaded={isLoaded} />
    {isLoaded && 
    <Switch>

      <Route exact path={'/'}>
        <AllSpots />
      </Route>

      <Route exact path={'/spots/new'}>
        <CreateSpotForm />
      </Route>

      <Route exact path={'/spots/:spotId'}>
        <SpotDetails />
      </Route>

      <Route exact path={'/current'}>
        <ManageSpots />
      </Route>

      <Route exact path={'/spots/:spotId/edit'}>
        <EditSpotForm />
      </Route>

      </Switch>}
      <Footer>
        <Footer isLoaded={ isLoaded }/>
      </Footer>
    </>
  );
}

export default App;
