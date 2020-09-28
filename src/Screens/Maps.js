import React, { useState, useEffect, useRef } from "react";
import { Map, Marker, Popup, TileLayer, Polyline, Circle } from "react-leaflet";

  
function Maps() {
  var position = [25.8, -80.3];
  var zoomLevel = 12;
  return (
    <div id="maps">
      <Map center={position} zoom={zoomLevel} >
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.1/dist/leaflet.css" />
      <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        </Map>
    </div>
  );
}

export default Maps;
