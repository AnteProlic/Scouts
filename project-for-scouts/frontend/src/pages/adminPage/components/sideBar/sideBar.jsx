import React, { useState, useEffect } from 'react';
import './sideBar.css'
import axios from 'axios';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import RequestsTable from './components/requestsTable.js';
import LegendTable from './components/legendTable.js';
import TextField from '@material-ui/core/TextField'
import EditLegend from './components/editLegendForm'

function Sidebar(props){
    const [collectionName, setCollectionName] = useState('');
    const [collectionNum, setCollectionNum] = useState(0);
    const [formVisibility, setFormVisibility] = useState('hidden');
    const [requests, setRequests] = useState([]);
    const [locations, setLocations] = useState([]);
    const [connections, setConnections] = useState([]);
    const [legends, setLegends] = useState([]);
    const [newId, setNewId] = useState('');

    useEffect(
        () => {
            axios
                .get('/req')
                .then(res => setRequests(res.data))
                .catch(err => console.log(err));
            axios
                .get('/legend')
                .then(res => {
                    let Max = 0;
                    res.data.forEach(e => {
                        if (Max < e.num) {
                            Max = e.num;
                        };
                    })
                    Max = Max+1
                    setCollectionNum(Max)
                    setLegends(res.data)
                })
                .catch(err => console.log(err));
            axios
                .get('/location')
                .then(res => setLocations(res.data))
                .catch(err => console.log(err));
            axios.get('/fileman/connect')
                .then(res => setConnections(res.data));
        }, []);

    function Accept(id, e) {
        axios
            .get('/req')
            .then(res => {
                res.data.forEach(el => {
                    if( id === el._id) {
                        if (el.typ === 'location') {
                            axios
                                .post('/location/add', {
                                    name: el.name,
                                    description: el.description,
                                    latitude: el.coordinates.latitude,
                                    longitude: el.coordinates.longitude,
                                    user: el.user,
                                    collection: el.collection
                                })
                                .then(res => {
                                    if (res.data === 200) {
                                        window.location.reload(false);
                                    }
                                })
                            axios
                                .post('/req/delete', {
                                    _id: id
                                })
                                .then(res => {
                                    if (res.data === 200) {
                                        window.location.reload(false);
                                    }
                                })
                        }
                        if (el.typ === 'legend') {
                            axios
                                .post('/legend/add', {
                                    name: el.name,
                                    num: collectionNum
                                })
                                .then(res => {
                                    if (res.data === 200) {
                                        window.location.reload(false);
                                    }
                                })
                            axios
                                .post('/req/delete', {
                                    _id: id
                                })
                                .then(res => {
                                    if (res.data === 200) {
                                        window.location.reload(false);
                                    }
                                })
                        }
                    }
                })
            })
    }

    function Reject(id, e){
        axios
        .post('/req/delete', {
            _id: id
        })
        .then(res => {
            if (res.data === 200) {
                window.location.reload(false);
            }
        })
    }

    function Submit() {
        axios.post('/legend/add', {
            name: collectionName,
            num: collectionNum
        }).then(res => {
            if (res.data === 200) {
                window.location.reload(false);
            }
        })
    }

    function Delete(id, e) {
        console.log(id)
        axios.post('/legend/delete', {
            _id: id
        }).then(res => {
            window.location.reload(false);
        })
    }

    function Update(e) {
        axios.put('/legend/', {
            _id: newId,
            name: e
        }).then(res => {
            if (res === 200) {
                window.location.reload(false)
            }
        })
    }

    function Exit(e) {
        if(e == 'visible') {
          setFormVisibility('hidden');
        }
    }

    function Edit(e) {
       setFormVisibility('visible');
       setNewId(e);
    };

    return(
        <div className='sidebar'>
            <Box>
                <Box id='req-style'>
                <h2 id='req-title'>Requests</h2>
                <RequestsTable 
                    elements = {requests}
                    onAccept = {Accept}
                    onReject = {Reject}
                />
                </Box>
                <Box id='sadf'>
                <LegendTable
                    onEdit = {Edit}
                    onDelete = {Delete}
                    connections = {connections}
                    legends = {legends}
                    locations = {locations}
                />
                </Box>
            </Box>
            <div id='top'>{/* 
                <TextField className='input-text1' type="text" placeholder="Search" onChangeCapture={(e) => console.log(e.target.value)}/>
                <Button id='cls-button' type='submit'>Search</Button> */}
            
            <TextField className='input-text2' placeholder="Add new collection" type='text' onChangeCapture={(e) => setCollectionName(e.target.value)}/>
            <Button id='cls-button1' onClick={Submit} >ADD</Button>
            <EditLegend
                onUpdate={Update}
                visibility={formVisibility}
            />
            </div>
        </div>
    )
};

export default Sidebar