import React, { useState, useEffect } from 'react';
import axios from 'axios';
import L from 'leaflet'
import { Map, TileLayer} from 'react-leaflet';

import './map.css';
import NewMarker from './components/newMarker/newMarker';
import SetMarker from './components/setMarker/setMarker';
import EditForm from './components/editForm/editForm';

import './map.css';
function MapComponent() {
  const [markers, setMarker] = useState([43.512207, 16.455883]);
  const [visibility, setVisibility] = useState('markerInvisible');
  const [formVisibility, setFormVisibility] = useState('hidden');
  const [locations, setLocations] = useState([])
  const [legends, setLegends] = useState([])
  const [connections, setConnections] = useState([]);
  const [newid, setNewid] = useState('');

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
      .then(res => setConnections(res.data));
  }, [])

  function Submit(e) {
    console.log(e)
    axios.post('/location/add', {
      name: e[0],
      latitude: markers[0],
      longitude: markers[1],
      description: e[1],
      collection: e[2]
    })
      .then(res => {
        if (res.data === 200) {
          window.location.reload(false)
        }
      });
  };

  function Update(e) {
    axios.post('/location/update', {
      _id: newid,
      name: e[0],
      description: e[1],
      collection: e[2]
    })
      .then(res => {
        if (res.data === 200) {
          window.location.reload(false)
        }
      });
  };
  
  function Edit(id, e) {
    setFormVisibility('visible');
    setNewid(id);
  };

  function Delete(id, e) {
    axios.post('/location/delete', {
      _id: id
    })
      .then(res => {
        if (res.data === 200) {
          window.location.reload(false);
        };
      });
  };

  function openPopup(marker) {
    if (marker && marker.leafletElement) {
      window.setTimeout(() => {
        marker.leafletElement.openPopup()
      });
    };
  };

  function Exit(e) {
    if(e == 'visible') {
      setFormVisibility('hidden');
    }
  }

  return <div>
    <Map minZoom={14} id='target' onContextMenu={(e) => {
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
        onSubmit = {Submit}
        visibility = {visibility}
      />
      <NewMarker
        connections={connections}
        locations = {locations}
        legend = {legends}
        legends = {legends}
        icon = {myIcon}
        onEdit = {Edit}
        onDelete = {Delete}
      />
    
    </Map>

    <EditForm
      onExit={Exit}
      formVisibility = {formVisibility}
      elements = {legends}
      onUpdate = {Update} 
    />

      
  </div>
};

export default MapComponent;