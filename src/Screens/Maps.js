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
import L from "leaflet";




function GetIcon(_iconSize, typeIcon) {
  return L.icon({
    iconUrl: require("../Images/" + typeIcon + ".png"),
    iconSize: [_iconSize]
  })
}
function Maps({toggleDrawer, state}) {
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
    { name: "icon1", position: [25.76321, -80.1952], "typeIcon":"Restrooms" },
    { name: "icon2", position: [25.76421, -80.1953],"typeIcon":"food" },
    { name: "icon2", position: [25.76521, -80.19541],"typeIcon":"athletic" },
  ];

  var position = [25.763, -80.195];
  var zoomLevel = 17;
  return (
    <div id="maps">
      <Map center={position} zoom={zoomLevel}  attributionControl={false}>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.0.1/dist/leaflet.css"
        />
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
          <Marker icon = {GetIcon(40, location.typeIcon)} position={location.position}>

            
          </Marker>
        ))}

        <Control position="topleft" >
          <TemporaryDrawer toggleDrawer={toggleDrawer} state={state}/>
        </Control>
      </Map>
    </div>
  );
}

export default Maps;
