import React from 'react';
import { Link } from 'react-router-dom';

import './login.css';

const Login = () => {
    return <div id='form_container'>
        <div id='title'>LOG IN</div>
        <form method='POST' action='http://localhost:5000/user/login' encType='multipart/form-data'>
            <div>Username: </div>
            <input type='text' name='username' /><br/>
            <div>Password: </div>
            <input type='password' name='password' /><br/>
            <br />
            <input type='submit' value='SUBMIT'></input>
        </form>
        <Link className='button' to='/register'>REGISTER</Link>
        <hr></hr>
        <Link className='button' to='/'>SKIP</Link>
    </div>
};

export default Login;