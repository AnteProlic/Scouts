import React, { Fragment, useState } from 'react';
import './editForm.css';
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import NativeSelect from '@material-ui/core/NativeSelect'

import NewOptions from '../newOptions/newOptions'

function EditForm(props) {
    const { elements, onUpdate, formVisibility, onExit } = props;

    const [locationName, setLocationName] = useState('');
    const [locationDescription, setLocationDescription] = useState('');
    const [collection, setCollection] = useState('1');
 

    return (
        <Fragment>
            {
                elements.map(el => {
                    return (
                        <div>
                            <div div id='shadow' onClick={onExit.bind(this, 'visible')} style= {{visibility: formVisibility}}>
                            </div>
                            <div id='new_form' style= {{visibility: formVisibility}}>
                            <div></div>
                            <h2>EDIT</h2>
                            <TextField id="filled-basic" label="Location name"  type='text' onChangeCapture={(e) => { setLocationName(e.target.value) }} />
                            <br></br>
                            <br />
                            <TextField id="filled-basic" label="Location description"  type='text' onChangeCapture={(e) => { setLocationDescription(e.target.value) }} />
                            <br />
                            <br />
                            <NativeSelect onChangeCapture={(e) => { setCollection(e.target.value) }}>
                            {<NewOptions
                                    legends={elements} 
                                  />}
                            </NativeSelect>
                            <br />
                            <form action='/action_page.php'>
                              <input type='file' id='myFile' name='filename'></input>
                              <br/>
                              <Button variant="contained" color="white" type='submit' >submit</Button>
                            </form>
                            <br />
                            <Button variant="contained" color='white' type='submit' value='UPDATE' onClick={onUpdate.bind(this, [locationName, locationDescription, collection])}>update</Button>
                            </div>
                        </div>
                    )
                })
            }
        </Fragment>
    )
}

export default EditForm;