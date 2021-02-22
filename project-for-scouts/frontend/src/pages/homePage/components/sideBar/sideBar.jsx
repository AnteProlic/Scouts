import React, { useState, useEffect, useRef } from 'react';
import './sideBar.css'
import axios from 'axios';

const Container = () => {
    const [ newArray, setNewArray ] = useState('');
    const [ collectionName, setCollectionName ] = useState('');
    const [ collectionNum, setCollectionNum ] = useState('');
    const [ items, setItems ] = useState('');
    const myRef = useRef(null);

    useEffect(() => {
        axios.post('/legend/get')
        .then(res => {
            axios.post('/location/get')
            .then(resp => {
                let na2 = [];
                res.data.forEach(element => {
                    let na = [];
                    resp.data.forEach(elem => {
                        if ( element.num == elem.collection ) {
                            na.push(<div key={elem._id}>{elem.location}</div>);
                        };
                    });
                    if ( na.length !== 0 ) {
                        na2.push(<div key={element._id} onClick={console.log(myRef)}><hr/><h4>{element.name}</h4><div ref={myRef.current} id={'Container'+element.num}>{na}</div></div>);
                    }
                });
                setItems(na2);
            });
        });
    }, []);
    

    function Submit() {
        axios.post('/legend/get')
        .then(res => {
            let Max = 0;
            res.data.forEach(e => {
                if ( Max < e.num ) {
                    Max = e.num;
                };
            })
            console.log(Max)
            setCollectionNum(Max+1)
        })
        axios.post('/legend/add', {
            name: collectionName,
            num: collectionNum
        })
            .then(res => {
                if (res.data == 200) {
                window.location.reload(false);
                };
        });
    }
    
    return <div>
        <div className='sidebar'>
        Add a category:
        <br/>
        <input type='text' onChangeCapture={(e) => { setCollectionName(e.target.value);}}></input>
        <input type='button' value='+' onClick={Submit}></input>
        <hr/>
        {items}
        </div>
    </div>

};

export default Container