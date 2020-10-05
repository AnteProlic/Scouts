import React from 'react';

import './register.css';

const Register = () => {
    return <div id='form_container'>
        <div id='title'>REGISTER</div>
        <form  method='POST' action='http://localhost:5000/user/register' encType='multipart/form-data'>
            <div>Username: </div>
            <input type='text' name='username' /><br/>
            <div>E-mail: </div>
            <input type='email' name='email' /><br/>
            <div>Password: </div>
            <input type='password' name='password' /><br/>
            <div>Re-enter password: </div>
            <input type='password' name='repass' /><br/>
            <br />
            <input type='submit' value='SUBMIT' ></input>
        </form>
    </div>
};

export default Register;