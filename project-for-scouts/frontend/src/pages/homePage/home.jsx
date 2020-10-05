import React from 'react';

import './home.css';
import MapComponent from './components/map/map';
import SideBar from './components/sideBar/sideBar';

const Home = () => {
    return <div>
        <MapComponent />
        <SideBar />
    </div>
};

export default Home;