import React, { Fragment, useState } from 'react';
import './setMarker.css'
import { Marker, Popup } from 'react-leaflet';

import NewOptions from '../newOptions/newOptions'

function SetMarker(props) {
    const { elements, markers, icon, openPopup, onSubmit, visibility } = props;

    const [locationName, setLocationName] = useState('');
    const [locationDescription, setLocationDescription] = useState('');
    const [collection, setCollection] = useState('1');
    return(
        <Fragment>
            {elements.map(el => {
                return(
                    <Marker position={markers} icon={icon} ref={openPopup}>
                        <Popup className={visibility} id='popup1'>
                          Location name: <br></br>
                          <input type='text' className='input2' onChangeCapture={(e) => { setLocationName(e.target.value) }}></input>
                          <br />
                          Location description: <br></br>
                          <input type='text' className='input2' onChangeCapture={(e) => { setLocationDescription(e.target.value) }}></input>
                          <br />
                          Choose category:
                          <br />
                          <select onChangeCapture={(e) => { setCollection(e.target.value) }}>
                          {<NewOptions
                              legends={elements} 
                            />}
                          </select>
                          <br />
                          <br />
                          <input type='submit' className='input2' value='SUBMIT' onClick={onSubmit.bind(this, [locationName, locationDescription, collection])}></input>
                        </Popup>
                    </Marker>
                )
            })}
        </Fragment>
    )

}

export default SetMarker