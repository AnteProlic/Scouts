import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RenderMarker = () => {
    const [ markers, setMarkers] = useState([])
    useEffect(()=>{
      axios.post('/location/get')
      .then(res => {
        let ma = [];
        for (let i=0; i < res.data.length; i++) {
          ma.push(<div>
            location: {res.data[i].location}
            latitude: {res.data[i].coordinates.latitude}
            longitude: {res.data[i].coordinates.longitude}
            description: {res.data[i].description}
            </div>);
        };
        setMarkers(ma)
      });
    }, []);
    console.log(markers)
    return <div>{markers}</div>
  };

export default RenderMarker;