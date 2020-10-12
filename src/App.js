import React, { useState, useEffect, useRef } from "react";
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Maps from './Screens/Maps'
import home from './Screens/home.js';
import aboutPage from './Screens/aboutPage.js';
import Navigation from './Compononents/Navigation.js';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button, Container} from 'react-bootstrap';
import form from './Screens/form.js'


class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Navigation />
        <Router basename="/">
          <Switch>
            <Route exact path="/">
              <Maps />
            </Route>
            <Route path="/about" component={aboutPage}>
              <aboutPage />
            </Route>
            <Route path="/users" component={form}>
              <Users />
            </Route>
          </Switch>  
        </Router>
        </React.Fragment>
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
