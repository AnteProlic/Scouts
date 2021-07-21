import React, { Fragment } from 'react';
import './requestsTable.css'

function RequestsTable(props){

    const { elements, onAccept, onReject } = props;

    return(
        <Fragment>
            {elements.map(el => {
                return(
                    <div key={el._id} style={{display: "flex", alignItems: "center", flexDirection: "row"}}>
                        <h3>{el.location}</h3>
                        <input type='button' style={{ height: "2vh"}} onClick={onAccept.bind(this, el._id)} value='+'></input>
                        <input type='button' style={{ height: "2vh"}} onClick={onReject.bind(this, el._id)} value='-'></input>
                    </div>
                )
            })}
        </Fragment>  
    );
}

export default RequestsTable;
