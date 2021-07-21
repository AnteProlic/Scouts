import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box'
import InputLabel from '@material-ui/core/InputLabel'
import NativeSelect from '@material-ui/core/NativeSelect'

import './register.css';
import { useState } from 'react';

const Register = () => {
    const [username, setName] = useState('');
    const [email, setMail] = useState('');
    const [password, setPass] = useState('');
    const [repass, setRepass] = useState('');
    const [errMessage, getError] = useState('');
    const [admin, setAdmin] = useState(0)

    function Submit() {
        if (password !== repass) {
            getError('Password and re-entered password don\'t match')
        } else {
            axios.post('/user/register', {
                username: username,
                email: email,
                password: password,
                admin: admin
            })
                .then(res => {
                    if (res.data === 200) {
                        getError(<Redirect to='/' />);
                    } if (res.data === 403) {
                        getError('That user already exists');
                    };
                });
        };
    }

    return <div id='form_container'>
        {/* <Box id='sun'></Box> */}
        <Box id='reg-container'>
            <Box id='title'>REGISTER</Box>
            <br/>
            <div>{errMessage}</div>
            <TextField  id="outlined-basic" label="Username" variant="outlined"  className='input1' onChangeCapture={(e) => { setName(e.target.value) }} /><br />
            <br/>
            <TextField  id="outlined-basic" label="E-mail" variant="outlined"  className='input1' onChangeCapture={(e) => { setMail(e.target.value) }} /><br />
            <br/>
            <TextField  id="outlined-basic" label="Password" variant="outlined"  className='input1' onChangeCapture={(e) => { setPass(e.target.value) }} /><br />
            <br/>
            <TextField  id="outlined-basic" label="Re-enter password" variant="outlined"  className='input1' onChangeCapture={(e) => { setRepass(e.target.value) }} /><br />
            <br />
            <br/>
            <br/>
            <Button type='submit' id='submit' value='SUBMIT' onClick={Submit}>Submit</Button>
        </Box>

    </div>
};

export default Register;