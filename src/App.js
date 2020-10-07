import React, { useState, useEffect, useRef } from "react";
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Maps from './Screens/Maps'
import home from './Screens/home.js';
import Navigation from './Compononents/Navigation.js';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button, Container} from 'react-bootstrap';


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Router basename="/">
          <Switch>
            <Route path="/">
              <Maps />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
          </Switch>  
        </Router>
      </div>
  );
}
}
function Home() {
  return <h2></h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

export default App;
