import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import L from 'leaflet'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import { Redirect } from 'react-router-dom';

import './map.css';
const MapComponent = () => {
  const [markers, setMarker] = useState([43.512207, 16.455883]);
  const [visibility, setVisibility] = useState('markerInvisible');
  const [locationName, setLocationName] = useState('');
  const [locationDescription, setLocationDescription] = useState('');
  const [errMessage, getError] = useState('');
  const [collection, setCollection] = useState('1');
  const [points, setPoints] = useState([]);
  const [options, setOptions] = useState([]);
  const [formVisibility, setFormVisibility] = useState('markerInvisible');

  /* function LookForUser() {
    axios.get('/user/login')
      .then(res => {
        if (res.data == 404) {
          getError(<Redirect to='/login'/>);
        };
      });
  };

  LookForUser(); */

  const myIcon = L.icon({
    iconUrl: require('../images/marker-icon-2x.png'),
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41]
  });

  const positionId = useRef(null);

  function Response() {
    useEffect(() => {
      axios.post('/location/get')
        .then(res => {
          let mrkrs = [];
          res.data.forEach(element => {
            let coordinates = [element.coordinates.latitude, element.coordinates.longitude]
            mrkrs.push(
              <Marker position={coordinates} icon={myIcon} key={element._id}>
                <Popup id='popup'>
                  <div id={element._id} ref={positionId}>
                    Collection: {element.collection}
                    <br></br>
                    Location name: {element.location}
                    <br></br>
                    Description: {element.description}
                    <br></br>
                    <input type='button' value='Edit' onClick={Update}></input>
                    <input type='button' value='Delete' onClick={Delete}></input>
                  </div>
                </Popup>
              </Marker>);
          });
          setPoints(mrkrs);
        });
    }, []);

    useEffect(() => {
      axios.post('/legend/get')
        .then(res => {
          let opts = [];
          res.data.forEach(element => {
            opts.push(
              <option value={element.num} key={element._id}>{element.name}</option>
            );
          });
          setOptions(opts);
        });
    }, []);
  };

  Response();

  function Submit() {
    axios.post('/location/add', {
      location: locationName,
      latitude: markers[0],
      longitude: markers[1],
      description: locationDescription,
      collection: collection
    })
      .then(res => {
        if (res.data == 200) {
          window.location.reload(false)
        }
      });
  };

  function SubmitChange() {
    let posid = positionId.current.id
    axios.post('/location/update', {
      _id: posid,
      location: locationName,
      description: locationDescription,
      collection: collection
    })
      .then(res => {
        if (res.data == 200) {
          window.location.reload(false)
        }
      });
  };
  
  function Update() {
    setFormVisibility('markerVisible');
  };

  function Delete() {
    let posid = positionId.current.id
    axios.post('/location/delete', {
      _id: posid
    })
      .then(res => {
        if (res.data == 200) {
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

  return <div>
    {errMessage}
    <Map id='target' onContextMenu={(e) => {
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
      <Marker position={markers} icon={myIcon} ref={openPopup}>
        <Popup className={visibility} id='popup1'>
          Location name: <br></br>
          <input type='text' className='input2' onChangeCapture={(e) => { setLocationName(e.target.value) }}></input>
          <br />
          Location description: <br></br>
          <input type='text' className='input2' onChangeCapture={(e) => { setLocationDescription(e.target.value) }}></input>
          <br />
          Choose category:
          <br />
          <select onChangeCapture={(e) => { setCollection(e.target.value) }}>
            {options}
          </select>
          <br />
          <br />
          <input type='submit' className='input2' value='SUBMIT' onClick={Submit}></input>
        </Popup>
      </Marker>
      {points}
    </Map>
    <div id='new_form' className={formVisibility}>
      Location name:
      <br />
      <input type='text' onChangeCapture={(e) => { setLocationName(e.target.value) }}></input>
      <br></br>
        Location description:
      <br />
      <input type='text' onChangeCapture={(e) => { setLocationDescription(e.target.value) }}></input>
      <br />
      <br />
      <select onChangeCapture={(e) => { setCollection(e.target.value) }}>
        {options}
      </select>
      <br />
      <form action='/action_page.php'>
        <input type='file' id='myFile' name='filename'></input>
        <input type='submit'></input>
      </form>
      <br />
      <input type='submit' value='UPDATE' onClick={SubmitChange}></input>
    </div>
  </div>
};

export default MapComponent;