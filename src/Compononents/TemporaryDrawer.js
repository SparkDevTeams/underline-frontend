import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import { BiRightArrow } from "react-icons/bi";
import { BiUpArrow } from "react-icons/bi";
import {Form, FormControl, Container} from "react-bootstrap";



const TemporaryDrawer = () => {
  const useStyles = makeStyles({
    drawerPaper: {
      height: `100%`,
      top: document.querySelector('.navbar-custom').clientHeight,
    },
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
    <div>
      <Container className="formContainer">
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
        <Button variant="primary" type="submit" id="formSubmit">
          Submit
        </Button>
      </Form>
      </Container>
    </div>
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
            <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)} BackdropProps={{ invisible: true }}>
                {formDrawer(anchor)}
              </Drawer>}
        </React.Fragment>
      ))}

      {console.log(document.querySelector('.App'))}
    </div>
    
  );
}

export default TemporaryDrawer;

