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



const TemporaryDrawer = () => {
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

  const formDrawer = (anchor) => {
    return (
    <div>
      <Navigation />
      <EventForm />
      <Events />
    </div>
  )};

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

