import React from 'react';
import {Switch, Route } from 'react-router-dom';
import WelcomePage from "./pages/WelomePage";
import GamePage from "./pages/GamePage";

export default function App() {

    return (
      <Switch>
          <Route path="/game">
              <GamePage />
          </Route>
          <Route path="/finish">
              <WelcomePage />
          </Route>
          <Route path="/">
              <WelcomePage />
          </Route>
      </Switch>
    );
}
