import React, { useState, useEffect } from 'react';
import axios from 'axios';
import L from 'leaflet'
import { Map, TileLayer } from 'react-leaflet';

import './map.css';
import NewMarker from './components/newMarker/newMarker';
import SetMarker from './components/setMarker/setMarker';

const MapComponent = () => {
  const [markers, setMarker] = useState([43.512207, 16.455883]);
  const [visibility, setVisibility] = useState('markerInvisible');
  const [locations, setLocations] = useState([])
  const [legends, setLegends] = useState([])
  const [connections, setConnections] = useState([]);

  const myIcon = L.icon({
    iconUrl: require('../images/marker-icon-2x.png'),
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41]
  });

  useEffect(() => {
    axios.get('/location')
      .then(res => setLocations(res.data))
      .catch(err => console.log(err))
    axios.get('/legend')
      .then(res => setLegends(res.data))
    axios.get('/fileman/connect')
      .then(res => setConnections(res.data))
  }, [])

  function Request(e) {
    axios.post('/req/add/location', {
      name: e[0],
      latitude: markers[0],
      longitude: markers[1],
      description: e[1],
      collection: e[2],
      typ: 'location'
    })
      .then(res => {
        if (res.data === 200) {
          window.location.reload(false)
        }
      });
  };

  function openPopup(marker) {
    if (marker && marker.leafletElement) {
      window.setTimeout(() => {
        marker.leafletElement.openPopup()
      });
    };
  };

  return <div>
    <Map minZoom='14' id='target' onContextMenu={(e) => {
      setMarker([e.latlng.lat, e.latlng.lng]);
      setVisibility('markerVisible');
    }
    } onClick={e => {
      setMarker([e.latlng.lat, e.latlng.lng]);
      setVisibility('markerInvisible');
    }
    } id='map' center={[43.512207, 16.455883]} zoom={14}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <SetMarker
        elements = {legends}
        markers = {markers}
        icon = {myIcon}
        openPopup = {openPopup}
        onSubmit = {Request}
        visibility = {visibility}
      />
      <NewMarker
        connections={connections}
        locations = {locations}
        legend = {legends}
        legends = {legends}
        icon = {myIcon}
      />
    </Map>
  </div>
};

export default MapComponent;