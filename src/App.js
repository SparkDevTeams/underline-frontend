import React, { useState, useEffect, useRef } from "react";

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Maps from './Screens/Maps'
import { aboutPage } from './Screens/aboutPage.js';
import Navigation from './Compononents/Navigation.js';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button, Container} from 'react-bootstrap';
import EventForm  from './Compononents/EventForm'
import './App.css';
import axios from "axios";



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
            <Route path='/about' component={() => { 
            window.location.href = 'https://www.theunderline.org/'; 
          return null;
          }}/>
            <Route path="/form" component={EventForm}>
            </Route>
          </Switch>  
        </Router>
        </React.Fragment>
  );
}
componentDidMount(){
  axios.get('https://sparkdev-underline.herokuapp.com/users/find?email=<test@mail.com>')
  .then(res=> console.log(res.data))
}
}


export default App;
