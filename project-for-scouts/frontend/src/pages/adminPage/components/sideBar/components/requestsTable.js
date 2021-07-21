import React, { Fragment } from 'react';
import './requestsTable.css';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

function RequestsTable(props){

    const { elements, onAccept, onReject } = props;

    return(
        <Fragment>
            {elements.map(el => {
                return(
                    <div key={el._id} style={{display: "flex", alignItems: "center", flexDirection: "row"}}>
                        <div id='name'>{el.name}</div>
                        <i>{el.typ}</i>
                      
                        <Button id='accept' onClick={onAccept.bind(this, el._id)} value='+'><CheckIcon /></Button>
                        <Button id='reject' onClick={onReject.bind(this, el._id)} value='-'><ClearIcon /></Button>
                     
                    </div>
                )
            })}
        </Fragment>  
    );
}

export default RequestsTable;
