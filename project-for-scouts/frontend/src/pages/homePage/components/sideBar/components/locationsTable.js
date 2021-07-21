import React, { Fragment } from 'react';
import './requestsTable.css'

function LocationsTable(props){

    const { elements } = props;

    return(
        <Fragment>
            {elements.map(el => {
                return(
                    <div key={el._id}>
                        {el.name}
                    </div>
                )
            })}
        </Fragment>  
    );
}

export default LocationsTable;