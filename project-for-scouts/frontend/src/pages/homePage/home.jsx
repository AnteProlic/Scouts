import React from 'react';
import './home.css';
import MapComponent from './components/map/map';
import SideBar from './components/sideBar/sideBar';
import NavBar from './components/map/components/NavigationBar/navBar';

const Home = () => {
    return <div>
        <NavBar />
        <MapComponent />
        <SideBar />
    </div>
};

export default Home;    