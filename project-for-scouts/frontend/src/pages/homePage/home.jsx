import React from 'react';

import './home.css';
import MapComponent from './components/map/map';
import SideBar from './components/sideBar/sideBar';
import RenderMarker from './components/map/components/renderMarkers/renderMarkers'

const Home = () => {
    
    return <div>{/* 
        <RenderMarker /> */}
        
        <MapComponent />
        <SideBar />
    </div>
};

export default Home;