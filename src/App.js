import React, { useState, useEffect, useRef } from "react";
import logo from './logo.svg';
import { Map, Marker, Popup, TileLayer, Polyline, Circle } from "react-leaflet";
import './App.css';

  
function App() {
  var position = [25.8, -80.3];
  var zoomLevel = 12;
  return (
     <Map center={position} zoom={zoomLevel} >
     <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.1/dist/leaflet.css" />
     <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
      </Map>
  );
}

export default App;
