import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import { BiRightArrow } from "react-icons/bi";
import { BiUpArrow } from "react-icons/bi";
import {Form, FormControl, Container} from "react-bootstrap";
import * as Yup from 'yup';
import EventForm from "./EventForm.js"

// RegEx for phone number validation
const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

// Schema for yup
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "*Names must have at least 2 characters")
    .max(100, "*Names can't be longer than 100 characters")
    .required("*Name is required"),
  email: Yup.string()
    .min(2, "*Names must have at least 2 characters")
    .max(100, "*Description can't be longer than 100 characters")
    .required("*Event Description is required"),
  phone: Yup.string()
    .matches(phoneRegExp, "*Phone number is not valid")
    .required("*Phone number required"),
  blog: Yup.string()
  .min(2, "*Names must have at least 2 characters")
  .max(100, "*Names can't be longer than 100 characters")
});


const TemporaryDrawer = () => {
  const useStyles = makeStyles({
    drawerPaper: {
      height: `100%`,
      top: document.querySelector('.navbar-custom').clientHeight,
    },
    drawerPaper2: {
      '@media (min-height:500px)': { 
        height: '55%'
      },

      '@media (min-height:1000px)': { 
        height: '60%'
      },

      '@media (min-height:1000px)': {
        height: '35%'
      }
    }
  });
  
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
    bottom: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    
    setState({ ...state, [anchor]: open });
  };

  const formDrawer = (anchor) => (
    <EventForm />
  );

  return (
    <div>
      {['left', 'bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          {anchor === 'left' ? <Button onClick={toggleDrawer(anchor, true)} id={anchor + 'Button'}>{<BiRightArrow />}</Button> : <Button onClick={toggleDrawer(anchor, true)} id={anchor + 'Button'}>{<BiUpArrow />}</Button>}
          
          {anchor === 'left' ? 
            <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)} BackdropProps={{ invisible: true }} classes={{
            paper: classes.drawerPaper
          }}>
              {formDrawer(anchor)}
            </Drawer>
            :
            <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)} BackdropProps={{ invisible: true }} classes={{
              paper: classes.drawerPaper2
            }}>
                {formDrawer(anchor)}
              </Drawer>}
        </React.Fragment>
      ))}

      {console.log(document.querySelector('.App'))}
    </div>
    
  );
}

export default TemporaryDrawer;

