import React from 'react';
import {Switch, Route } from 'react-router-dom';
import WelcomePage from "./pages/WelomePage";
import GamePage from "./pages/GamePage";
import FinishPage from "./pages/FinishPage";

export default function App() {

    return (
      <Switch>
          <Route path="/game">
              <GamePage />
          </Route>
          <Route path="/finish">
              <FinishPage />
          </Route>
          <Route path="/">
              <WelcomePage />
          </Route>
      </Switch>
    );
}
