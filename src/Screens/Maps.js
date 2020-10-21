import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import {
  Map,
  Marker,
  Popup,
  TileLayer,
  Polyline,
  Circle,
  Polygon,
  Rectangle,
} from "react-leaflet";
import { Sidebar, Tab } from "react-leaflet-sidetabs";
import { FiHome, FiChevronRight, FiSearch, FiSettings } from "react-icons/fi";
import { popup } from "leaflet";
import {Navbar, Nav, NavDropdown, Form, FormControl, Button, Container, Row, Col, Card} from 'react-bootstrap';
import TemporaryDrawer from '../Compononents/TemporaryDrawer'
import Control from 'react-leaflet-control';

function Maps(props) {
  const [collapsed, setCollapsed] = useState(true);
  const [selected, setSelected] = useState("home");

  const onClose = () => {
    setCollapsed(true);
  };

  const onOpen = (id) => {
    setCollapsed(false);
    setSelected(id);
  };

  const locations = [
    { name: "icon1", position: [25.76321, -80.195200] },
    { name: "icon2", position: [25.76421, -80.195300] },
    { name: "icon2", position: [25.76521, -80.195410] },
  ];

  var position = [25.763, -80.195];
  var zoomLevel = 17;
  return (
    <div id="maps">
      <Map center={position} zoom={zoomLevel}>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.0.1/dist/leaflet.css"
        />
        <Sidebar
          id="sidebar"
          position="right"
          collapsed={collapsed}
          closeIcon={<FiChevronRight />}
          selected={selected}
          onOpen={onOpen}
          onClose={onClose}
        >
          <Tab id="home" header="Home" icon={<FiHome />}>
            <p>No place like home!</p>
          </Tab>
          <Tab id="search" header="Search" icon={<FiSearch />}>
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
          </Tab>
          <Tab
            id="settings"
            header="Settings"
            anchor="bottom"
            icon={<FiSettings />}
          >
            <p>We don't want privacy so much as privacy settings!</p>
          </Tab>
        </Sidebar>
        <TileLayer
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          id=""
          accessToken=""
        />
        <Polygon
          positions={[
            [25.7664, -80.1957],
            [25.7664, -80.1954],
            [25.7625, -80.1952],
            [25.7625, -80.1955],
          ]}
		  //color="blue"
		  fillColor='green'
    		weight={2}
        	opacity={.01} //Outline color
        	fillOpacity={0.4}
        />
        {locations.map((location) => (
          <Marker position={location.position}></Marker>
        ))}

        <Control position="topleft" >
          <TemporaryDrawer />
        </Control>
      </Map>
    </div>
  );
}

export default Maps;
