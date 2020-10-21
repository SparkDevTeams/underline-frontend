import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Control from 'react-leaflet-control';
import { BiRightArrow } from "react-icons/bi";
import { BiUpArrow } from "react-icons/bi";
import {Form, FormControl, Container} from "react-bootstrap";


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

const TemporaryDrawer = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      
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
				<Button variant="primary" type="submit">
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
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
    
  );
}

export default TemporaryDrawer;
