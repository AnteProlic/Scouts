import React from 'react';

import './bottomBar.css';

const BottomBar = (props) => {
    return <div id='bottom_bar'>
        <div className='pos'>
            <div className='nb'>LAT:</div>
            <div className='text'>{props.lat}</div>
        </div>
        <div className='pos'>
            <div className='nb'>LNG:</div>
            <div className='text'>{props.lng}</div>
        </div>
    </div>
};

export default BottomBar;