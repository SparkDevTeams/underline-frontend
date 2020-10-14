import React, { useState, useEffect, useRef } from "react";
import {  withRouter } from 'react-router-dom';
import { Map, Marker, Popup, TileLayer, Polyline, Circle, Polygon, Rectangle } from "react-leaflet";

  
function Maps() {
  var position = [25.763, -80.195];
  var zoomLevel = 17;
  return (
    <div id="maps">
      <Map center={position} zoom={zoomLevel} >
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.1/dist/leaflet.css" />
        <TileLayer
              url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
              id=''
              accessToken=''
              
        />
        <Polygon 
        positions={[[25.7664, -80.1957], [25.7664, -80.1954], [25.7625, -80.1952], [25.7625, -80.1955]]}
        color="blue"
        />
      </Map>
    </div>
  );
}

export default Maps;
