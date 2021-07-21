import React from 'react';
import './home.css';
import MapComponent from './components/map/map';
import SideBar from './components/sideBar/sideBar';
import NavBar from './components/map/components/NavigationBar/navBar';
import Collapsible from 'react-collapsible';
import Button from '@material-ui/core/Button'
import AddLocationIcon from '@material-ui/icons/AddLocation';

const Admin = () => {

    return <div>
        <NavBar /> 
        <MapComponent />
        <Collapsible trigger={<Button id='btncolor'><AddLocationIcon /></Button>}>
        <SideBar />
        </Collapsible>
    
    
    </div>
};

export default Admin;