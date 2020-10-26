import React, { useState, useEffect, useRef } from "react";
import '../App.css';
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
// Schema for yup


// RegEx for phone number validation
const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

// Schema for yup
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "*Names must have at least 2 characters")
    .max(100, "*Names can't be longer than 100 characters")
    .required("*Name is required"),
  email: Yup.string()
    .email("*Must be a valid email address")
    .max(100, "*Email must be less than 100 characters")
    .required("*Email is required"),
  phone: Yup.string()
    .matches(phoneRegExp, "*Phone number is not valid")
    .required("*Phone number required"),
  blog: Yup.string()
    .url("*Must enter URL in http://www.example.com format")
    .required("*URL required")
});


export const formPage = () => (
  <React.Fragment>
    <Container>

      //Sets initial values for form inputs
      <Formik
        initialValues={{ name:"", email:"", phone:"", blog:""}}
        validationSchema={validationSchema}
        onSubmit={(values, {setSubmitting, resetForm}) => {
            // When button submits form and form is in the process of submitting, submit button is disabled
            setSubmitting(true);
            
            // Resets form after submission is complete
            resetForm();

            // Sets setSubmitting to false after form is reset
            setSubmitting(false);
           // Simulate submitting to database, shows us values submitted, resets form
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            resetForm();
            setSubmitting(false);
          }, 500); 
        }}
      >

        {/* Callback function containing Formik state and helpers that handle common form actions */}
        {({ values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting }) => (
            <Form onSubmit={handleSubmit} className="mx-auto">
              {console.log(values)}
              <Form.Group controlId="formName">
                <Form.Label>Name :</Form.Label>
                <Form.Control
                  type="text"
                  /* This name property is used to access the value of the form element via values.nameOfElement */
                  name="name"
                  placeholder="Full Name"
                  /* Set onChange to handleChange */
                  onChange={handleChange}
                  /* Set onBlur to handleBlur */
                  onBlur={handleBlur}
                  /* Store the value of this input in values.name, make sure this is named the same as the name property on the form element */
                  value={values.name}
                  /* Check if the name field (this field) has been touched and if there is an error, if so add the .error class styles defined in the CSS (make the input box red) */
                  className={touched.name && errors.name ? "error" : null}
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email :</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className={touched.email && errors.email ? "error" : null}

                />
                {touched.email && errors.email ? (
                  <div className="error-message">{errors.email}</div>
                ) : null}
              </Form.Group>
              <Form.Group controlId="formPhone">
                <Form.Label>Phone :</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone}
                  className={touched.phone && errors.phone ? "error" : null}
                />
                {touched.phone && errors.phone ? (
                  <div className="error-message">{errors.phone}</div>
                ) : null}
              </Form.Group>
              <Form.Group controlId="formBlog">
                <Form.Label>Blog :</Form.Label>
                <Form.Control
                  type="text"
                  name="blog"
                  placeholder="Blog URL"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.blog}
                  className={touched.blog && errors.blog ? "error" : null}
                />
                
              </Form.Group>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
   Submit
</Button>
            </Form>
          )}
      </Formik>
    </Container>
  </React.Fragment>
)
