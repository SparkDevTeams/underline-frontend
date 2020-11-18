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
import Events from './Events'
import Navigation from './Navigation'



const TemporaryDrawer = ({toggleDrawer, state}) => {
  const useStyles = makeStyles({
    drawerPaper: {
      height: `100%`,
      top: document.querySelector('.navbar-custom').clientHeight,
      '@media (min-width:500px)': { 
        width: '55%'
      },

      '@media (min-width:1000px)': { 
        width: '35%'
      },
    },

    drawerPaper2: {
      '@media (min-height:500px)': { 
        height: '55%'
      },

      '@media (min-height:1000px)': { 
        height: '60%'
      },

      '@media (min-height:1000px)': {
        height: '35%',
        width: '50%'
      }
    }
  });
  
  const classes = useStyles();

  const formDrawer = (anchor) => {
    return (
    <div>
      <EventForm />
      <Events />
    </div>
  )};

  return (
    <div>
      {
        <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)} BackdropProps={{ invisible: true }} classes={{
          paper: classes.drawerPaper
        }}>
            {formDrawer('left')}
          </Drawer>
      }
    </div>
    
  );
}

export default TemporaryDrawer;

