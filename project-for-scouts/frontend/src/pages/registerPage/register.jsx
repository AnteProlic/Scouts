import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import './register.css';
import { useState } from 'react';

const Register = () => {
    const [username, setName] = useState('');
    const [email, setMail] = useState('');
    const [password, setPass] = useState('');
    const [repass, setRepass] = useState('');
    const [errMessage, getError] = useState('');

    function Submit() {
        if (password !== repass) {
            errMessage = 'Password and re-entered password don\'t match'
        } else {
            axios.post('/user/register', {
                username: username,
                email: email,
                password: password
            })
            .then(res => {
                if (res.data == 200) {
                    getError(<Redirect to='/'/>);
                } if (res.data == 403) {
                    getError('That user already exists');
                };
            });
          };
        }
    
    return <div id='form_container'>
        <div id='title'>REGISTER</div>
        <div>
            <div>{errMessage}</div>
            <div>Username: </div>
            <input type='text' name='username' onChangeCapture={(e) => {setName(e.target.value)}}/><br/>
            <div>E-mail: </div>
            <input type='email' name='email' onChangeCapture={(e) => {setMail(e.target.value)}}/><br/>
            <div>Password: </div>
            <input type='password' name='password' onChangeCapture={(e) => {setPass(e.target.value)}}/><br/>
            <div>Re-enter password: </div>
            <input type='password' name='repass' onChangeCapture={(e) => {setRepass(e.target.value)}}/><br/>
            <br />
            <input type='submit' value='SUBMIT' onClick={Submit}></input>
        </div>
    </div>
};

export default Register;