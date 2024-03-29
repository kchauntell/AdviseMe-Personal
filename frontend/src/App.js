import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import LoginFormPage from "./components/LoginFormPage";
// import SignupFormPage from "./components/SignupForm";
import NotebooksPage from './components/NotebooksPage';
import PersonalNBPage from "./components/PersonalNBPage";
import HomePage from './components/HomePage';
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import CreateNotebookPage from "./components/CreateNotebookPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route exact path="/notebooks">
            <NotebooksPage />
          </Route>
          <Route exact path="/notebooks/:username">
            <PersonalNBPage />
          </Route>
          <Route exact path='/notebooks/:username/createNotebook'>
            <CreateNotebookPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
