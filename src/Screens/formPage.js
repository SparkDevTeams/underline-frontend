import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from 'react-router-dom';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button, Container, Row, Col, Card} from 'react-bootstrap';

export const formPage = () => (
        <React.Fragment>
          <Container>
            <Form className="mx-auto">
              <Form.Group controlId="formName">
                <Form.Label>Name :</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email :</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  placeholder="Email"
                />
              </Form.Group>
              <Form.Group controlId="formPhone">
                <Form.Label>Phone :</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  />
              </Form.Group>
              <Form.Group controlId="formBlog">
                <Form.Label>Blog :</Form.Label>
                <Form.Control
                  type="text"
                  name="blog"
                  placeholder="Blog URL"
                  />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Container>
        </React.Fragment>
)
