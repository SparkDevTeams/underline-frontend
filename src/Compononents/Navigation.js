import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from 'react-router-dom';
import {Navbar, Nav, Button, Container, Modal} from 'react-bootstrap';
import logo from '../Images/Logo.svg';
import Events from './Events';

const Navigation = ({toggleDrawer, state, changeButton}) => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

      
  return (
    <div className="App">
        <Navbar className="navbar-custom" expand="lg" variant = "dark" >
          <Navbar.Brand href="#home"><a className="navfont"><img className="LogoImg" src={logo} alt="Logo" /></a></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav > 
              <Nav.Link  href="/"><a className="navfont">Home</a></Nav.Link>
              <Nav.Link  href="/about"><a className="navfont">About</a></Nav.Link>
              <Nav.Link  href="/form"><a className="navfont">Form</a></Nav.Link>

              <Button onClick={toggleDrawer('left', true, 'createEventButton')} variant="link" id="createEventButton"><a className="navfont">Create an event</a></Button>

              <Button onClick={toggleDrawer('left', true, 'listEventsButton')} variant="link" id="listEvents"><a className="navfont">Events</a></Button>

      

              

              <Button variant="primary" onClick={handleShow}>Launch demo modal</Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Yoga Class</Modal.Title>
        </Modal.Header>
        <Modal.Body><b>Description:</b> Weekly 90 minute yoga session in the park</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
  )
}

    export default Navigation;
