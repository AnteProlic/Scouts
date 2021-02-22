import React from 'react';
import { Marker, Popup } from 'react-leaflet';

const NewMarker = (location, latitude, longitude, description, icon, ref) => {
    let coordinates = [latitude, longitude];
    return <Marker position={coordinates} icon={icon} ref={ref}>
        <Popup>
            Location name: {location}
            <br></br>
            Description: {description}
            <br></br>
            <input type='button' value='EDIT'></input>
            <br></br>
            <input type='button' value='DELETE'></input>
        </Popup>
    </Marker>;
};

export default NewMarker;