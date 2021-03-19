import React/*, { useState, useEffect, useRef }  */from 'react';
import { Link } from 'react-router-dom';
import './navBar.css';

const NavBar = () => {
    return <div>
        <div id='nav-container'>
            
            <div className='link1'>
            <Link className='link2' to='/login'>Log in /</Link>
            <Link className='link2' to='/register'> Register</Link>
            </div>  
        </div>

    </div>
}
export default NavBar;