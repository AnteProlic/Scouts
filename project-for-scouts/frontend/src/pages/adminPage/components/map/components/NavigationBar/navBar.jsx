import React/*, { useState, useEffect, useRef }  */from 'react';
import { Link } from 'react-router-dom';
import './navBar.css';
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box';
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Collapsible from 'react-collapsible';
import InboxIcon from '@material-ui/icons/Inbox';



const NavBar = () => {
    return <div>
        <Box id='nav-container1'>        
            <div className='link1'>
            <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
            <Button><Link className='linkin' to='/login'>Log in</Link></Button>
            <Button><Link className='linkin' to='/register'> Register</Link></Button>
            </ButtonGroup>
           
            </div>  
        </Box>

    </div>
}
export default NavBar;