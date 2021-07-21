import React, { useState, useEffect } from 'react';
import './sideBar.css'
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'/* 
import Collapsible from 'react-collapsible';

 */

import LegendTable from './components/legendTable.js';

function Container(props) {
    const [collectionName, setCollectionName] = useState('');
    const [locations, setLocations] = useState([]);
    const [legends, setLegends] = useState([]);
    const [visibility, setVisibility] = useState(0);
    const [connections, setConnections] = useState([]);

    useEffect(
        () => {
            axios
                .get('/legend')
                .then(res => {
                    setLegends(res.data)
                })
                .catch(err => console.log(err));
            axios
                .get('/location')
                .then(res => setLocations(res.data))
                .catch(err => console.log(err));
            axios
                .get('/user/get')
                .then(res => {
                    if (res.data !== 403) {
                        setVisibility(1)
                }
            })
            axios.get('/fileman/connect')
                .then(res => setConnections(res.data));
            }, [])

    function Submit() {
        axios.post('/req/add/legend', {
            name: collectionName,
            typ: 'legend'
        }).then(res => {
            if (res.data === 200) {
                window.location.reload(false);
            }
        })
    }

    return(
        <div className='sidebar'>
            <div>
                <Box id='sadf'>
                <LegendTable
                    connections = {connections}
                    legends = {legends}
                    locations = {locations}
                />
                </Box>
            </div>
            <div id='top'>{/* 
                <TextField className='input-text1' type="text" placeholder="Search" style={{opacity: visibility}} onChangeCapture={(e) => console.log(e.target.value)}/>
                <Button  variant="contained"  id='cls-button' type='submit' style={{opacity: visibility}}>Search</Button> */}
            
            <TextField className='input-text2' placeholder="Add new request" type='text' style={{opacity: visibility}} onChangeCapture={(e) => setCollectionName(e.target.value)}/>
            <Button  variant="contained"  id='cls-button1' onClick={Submit} style={{opacity: visibility}}>ADD</Button>
            </div>
        </div>
    )
};

export default Container