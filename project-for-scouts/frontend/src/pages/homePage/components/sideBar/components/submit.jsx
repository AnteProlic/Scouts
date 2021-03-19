import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Submit = (name, num) => {
    useEffect(() => {
        axios.post('/legend/add', {
            name: name,
            num: num
        })
        .then(res => {
            if (res.data === '200') {
                window.location.reload(false)
            };
        });
    }, []);

    return console.log(name, num)
}

export default Submit