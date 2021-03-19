import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

import './login.css';

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
                if (res.data == 200) {
                    getError(<Redirect to='/' />);
                } if (res.data == 401) {
                    getError('Username/password combination incorrect');
                } if (res.data == 403) {
                    getError('There\'s already an user in session');
                };
            });
    };

    function LogOut() {
        axios.get('/user/logout')
            .then(res => {
                if (res.data == 200) {
                    getError('User logged out')
                };
            });
    };

    return <div id='container-all'>
        <div id='side-content'>
        <div id='sun'></div>
        </div>
        <div id='text-container'>   
            <div id='text-content'>
            <div>
                <div className='text-h'>Log in</div>
                <div>{errMessage}</div>
                <div className='text-p'>Username: </div>
                <input className='input' type='text' name='username' onChangeCapture={(e) => { setName(e.target.value) }} /><br />
                <div className='text-p'>Password: </div>
                <input className='input' type='password' name='password' onChangeCapture={(e) => { setPass(e.target.value) }} /><br />
                <br />
                <input className='input' type='submit' value='LOG IN' class='button' onClick={Submit}></input>
                <br />
            </div>
            <br/>
            <p>You don't have account? Click the link below to make one!</p>
            <Link className='link' to='/register'>registration</Link>
            <div onClick={LogOut}>LOG OUT</div>
            </div>
        </div>

    </div>
};

export default Login;