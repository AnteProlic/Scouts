import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import L from 'leaflet'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import './map.css';
import BottomBar from '../bottomBar/bottomBar';

const MapComponent = () => {
  const [ markers, setMarker ] = useState([0, 0]);

  const myIcon = L.icon({
    iconUrl: require('../images/marker-icon-2x.png'),
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41]
  })  

  return <div>
    <Map id='target' onclick = {(e) => {setMarker([e.latlng.lat, e.latlng.lng])}} id='map' center = {[43.512207, 16.455883]} zoom = {14}>
    <TileLayer
      attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={markers} icon={myIcon}></Marker>
    </Map>
    <BottomBar lat={markers[0]} lng={markers[1]}/>
  </div>
};

export default MapComponent;