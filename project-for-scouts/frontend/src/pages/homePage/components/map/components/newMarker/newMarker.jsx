import React, { Fragment, useEffect, useState } from 'react';
import './newMarker.css'
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet'
import axios from 'axios';
import 'reactjs-popup/dist/index.css';
import Button from '@material-ui/core/Button';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

function NewMarker(props) {
    

    const {locations, legends, connections} = props;
    const myIcon = L.icon({
       iconUrl: require('../../../images/marker-icon-2x.png'),
       iconSize: [25, 41],
       iconAnchor: [12.5, 41],
       popupAnchor: [0, -41]
     });

    return (
        <Fragment>
            {
                locations.map(el => {
                    let coordinates = [el.coordinates.latitude, el.coordinates.longitude]

                    const legend = legends.filter(legend => legend.num == el.collection)[0];
                    console.log(legend)/* 
                    const imgName = connections.filter(imgName => legend._id == imgName.leg_id) */
                    
                    return(
                        <Marker key={el._id} position={coordinates} key={el._id} icon={myIcon}>
                            <Popup maxHeight='180' id='popup'>
                                <div id='font'>
                              <div id={el._id}>
                                <br/>
                                <b>Collection:</b> {legends.map(elem => {
                                    if (elem.num === Number(el.collection)) {
                                        return(elem.name)
                                    }
                                })} 
                                <br></br>
                                <b>Location name:</b> {el.name}
                                <br></br>
                                <hr/>
                                <b>Description:</b>
                                <br/> 
                                {el.description}
                                <br></br>
                                <hr/>
                                        {connections.map(elem => {
                                            if (elem.leg_id === el._id) {
                                                return <img src={elem.img_url} className='pfp1' ></img>
                                            }
                                        })}
                                
                              </div>
                              </div>
                            </Popup>
                        </Marker>
                    )
                })
            }
        </Fragment>
    )
};

export default NewMarker;