import React, { Fragment, useState } from 'react';
import './editLegendForm.css';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

function EditLegend(props) {

    const [legendName, setLegendName] = useState('')

    const {onUpdate, visibility} = props;

    return <Fragment>
        <div style={{visibility: visibility}}>
            <TextField  placeholder="Update" type='text' onChange={e => setLegendName(e.target.value)}/>
            <Button id='button-1' variant="contained" type='submit' onClick={onUpdate.bind(this, legendName)}>Submit</Button>
        </div>
    </Fragment>
}

export default EditLegend