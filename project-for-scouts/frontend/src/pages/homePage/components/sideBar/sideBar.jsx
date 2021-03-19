import React, { useState, useEffect, useRef } from 'react';
import './sideBar.css'
import axios from 'axios';
import Collapsible from 'react-collapsible';

const Container = () => {
    const [left, setLeft] = useState('visible');
    const [right, setRight] = useState('invisible');
    const [collectionName, setCollectionName] = useState('');
    const [collectionNum, setCollectionNum] = useState(0);
    const [items, setItems] = useState('');
    const [inputs, setInputs] = useState();
    const [clr, setClr] = useState('input-box')
    const [clr1, setClr1] = useState('')
    const myRef = useRef(null);
    const [addCollection, setAddCollection] = useState('');
    const [addCollection1, setAddCollection1] = useState('');

    function Start() {
        useEffect(() => {
            axios.post('/user/get')
                .then(res => {})
            axios.post('/legend/get')
                .then(res => {
                    let Max = 0;
                    res.data.forEach(e => {
                        if (Max < e.num) {
                            Max = e.num;
                        };
                    })
                    Max = Max+1
                    setCollectionNum(Max)
                    axios.post('/location/get')
                        .then(resp => {
                            let na2 = [];
                            res.data.forEach(element => {
                                let na = [];
                                resp.data.forEach(elem => {
                                    if (element.num == elem.collection) {
                                        na.push(
                                            <Collapsible key={elem._id} transitionTime='0' trigger={<div id='location'>{elem.location}</div>}>
                                                <div id='text-description'>{elem.description}</div>
                                            </Collapsible>

                                        );
                                    };
                                });
                                if (na.length !== 0) {
                                    na2.push(
                                        <div id='sum' key={element._id}>
                                            <Collapsible key={element._id} open transitionTime='20' trigger={<div id='col-name'><b>{element.name}</b></div>}>
                                                <div id={'Container' + element.num}>{na}</div>
                                            </Collapsible>
                                        </div>
                                    );
                                }
                            });
                            setItems(na2);
                        });
                });
        }, []);
    }

    function Submit() {
        axios.post('/legend/add', {
            name: collectionName,
            num: collectionNum
        }).then(res => {
            if (res.data == 200) {
                window.location.reload(false);
            }
        })
    }

    function Request() {
        axios.post('/request/add', {
            name: collectionName,
            num: collectionNum
        }).then(res => {
            if (res.data == 200) {
                window.location.reload(false);
            }
        })
    }

    function addCol() {
        setClr('change-color');
        setClr1('change-color2');
        setLeft('visible');
        setRight('invisible');
    }

    function srch() {
        setClr1('change-color1');
        setClr('change-color2');
        setLeft('invisible');
        setRight('visible');
    }

    Start();

    return <div>
        <div className='sidebar'>
            <div id='top'>
                <div id='right'><b onClick={srch}>Search</b></div> 
                <div id='left'><b onClick={addCol}>Add collection</b></div>{/* 
                {addCollection} */}
            </div>
            <div>
            <div className='input-box' className={left} ref={myRef}>
                <input className='input-text' className={left} type="text" onChangeCapture={(e) => setCollectionName(e.target.value)}/>
                <button className='cls-button' className={left} onClick={Submit} type='submit'>Add</button>{/* 
                {addCollection1} */}
            </div>
            <div>
            <div className='input-box' className={right}>
                <input className='input-text' className={right} type='text' onChangeCapture={(e) => console.log(e.target.value)}/>
                <button className='cls-button' className={right}>Search</button>
            </div>
        </div>
        </div>
            {inputs}
            <div id='list'>
                {items}
            </div>
        </div>
    </div>

};

export default Container