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
                getError(<Redirect to='/'/>);
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

    return <div id='form_container'>
        <div id='title'>LOG IN</div>
        <div>
            <div>{errMessage}</div>
            <div>Username: </div>
            <input type='text' name='username' onChangeCapture={(e) => {setName(e.target.value)}}/><br/>
            <div>Password: </div>
            <input type='password' name='password' onChangeCapture={(e) => {setPass(e.target.value)}}/><br/>
            <br/>
            <input type='submit' value='LOG IN' onClick={Submit}></input>
            <br />
        </div>
        <Link className='button' to='/register'>REGISTER</Link>
        <hr></hr>
        <button onClick={LogOut}>LOG OUT</button>
    </div>
};

export default Login;