import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router";
import axios from 'axios';
import './admin.css';
import MapComponent from './components/map/map';
import SideBar from './components/sideBar/sideBar';
import NavBar from './components/map/components/NavigationBar/navBar';
import Collapsible from 'react-collapsible';
import Button from '@material-ui/core/Button'
import AddLocationIcon from '@material-ui/icons/AddLocation';

const Admin = () => {
    const [ check, setCheck ] = useState(0);

    useEffect(() => {
            axios.post('/user/get')
                .then(res => {
                    if ( res.data === 1 ) {
                        setCheck(<div>
                            <NavBar />
                            <MapComponent />
                            <Collapsible trigger={<Button id='btncolor'><AddLocationIcon /></Button>}>
                            <SideBar />
                            </Collapsible>
                        </div>)
                    }
                    if ( res.data === 0 ) {
                        setCheck(<Redirect to='/login' />)
                    }
                })
        }, []
    )

    return <div>
        {check}
    </div>
};

export default Admin;