import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './login.css';
import Box from '@material-ui/core/Box'


const Login = () => {
    const [username, setName] = useState('');
    const [password, setPass] = useState('');
    const [errMessage, getError] = useState('');

    function Submit() {
        axios.post('/user/login', {
            username: username,
            password: password
        })

            .then(res => {
                if (res.data === 200) {
                    axios.post('/user/get').then(res => {
                        if (res.data === 1) {
                            getError(<Redirect to='/admin'/>)
                        } if (res.data === 0) {
                            getError(<Redirect to='/'/>)
                        } else {
                            getError(<Redirect to='/login' />)
                        }
                    })
                } if (res.data === 401) {
                    getError('Username/password combination incorrect');
                } if (res.data === 403) {
                    getError('There\'s already an user in session');
                };
            });
    };

    function LogOut() {
        axios.get('/user/logout')
            .then(res => {
                if (res.data === 200) {
                    getError('User logged out')
                };
            });
    };

    return <div>
        <Box>
        </Box>
        <Box id='text-container'>   
            <Box id='text-content'>
            <Box id='flex'>
                <Box className='text-h'>Log in</Box>
                <br />
                <Box>{errMessage}</Box>
                <br />  
                <TextField id="filled-basic" label="Username" variant="filled" className='input' type='text' name='username' onChangeCapture={(e) => { setName(e.target.value) }} />
                <br />
                <TextField id="filled-basic" label="Password" variant="filled" className='input' type='password' name='password' onChangeCapture={(e) => { setPass(e.target.value) }} />
                <br />
                <Box />
                <Button id="filled-basic" label="Filled" variant="filled" id='login' onClick={Submit}>Log in</Button>
                <br />
                <Box>You don't have account? Click the link below to make one!</Box>
            <Button><Link className='link' to='/register'>registration</Link></Button>       
            </Box>
            
            </Box>
        </Box>

    </div>
};

export default Login;