import React, { useState, useEffect, useRef } from "react";
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Maps from './Screens/Maps'

class App extends React.Component {
  render() {
    return (
      <Router basename="/">
        <Switch>
          <Route path="/">
            <Maps />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
