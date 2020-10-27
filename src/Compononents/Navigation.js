import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from 'react-router-dom';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button, Container} from 'react-bootstrap';

class Navigation extends React.Component {
  render() {
    return (
        <div className="App">
        <Navbar className="navbar navbar-custom">
          <Navbar.Brand href="#home"><a className="navfont">The Underline</a></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav > 
              <Nav.Link  href="/"><a className="navfont">Home</a></Nav.Link>
              <Nav.Link  href="/about"><a className="navfont">About</a></Nav.Link>
              <Nav.Link  href="/form"><a className="navfont">Form</a></Nav.Link>
              
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        </div>
    );
    }
}
export default Navigation;