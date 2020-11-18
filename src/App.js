import React, { useState, useEffect, useRef } from "react";

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Maps from './Screens/Maps'
import { aboutPage } from './Screens/aboutPage.js';
import Navigation from './Compononents/Navigation.js';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button, Container} from 'react-bootstrap';
import EventForm  from './Compononents/EventForm'
import './App.css';
import axios from "axios";



const App = () => {

  const [state, setState] = useState({
    left: false,
    bottom: false,
  });

  const [button, setButton] = useState("listEvents");
  
  const toggleDrawer = (anchor, open, button) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    
    setState({ ...state, [anchor]: open });
    setButton(button);
  };

  const changeButton = (btn) => {
    setButton(btn);
  }

    return (
      <React.Fragment>
        <Navigation toggleDrawer={toggleDrawer} state={state}/>
        <Router basename="/">
          <Switch>
            <Route exact path="/">
              <Maps toggleDrawer={toggleDrawer} state={state} button={button}/>
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


export default App;
