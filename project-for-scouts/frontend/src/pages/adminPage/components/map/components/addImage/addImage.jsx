import React, { Fragment, useState } from 'react';
import './addImage.css';

function AddImage(props) {
    const { onAdd } = props

    const [newFile, setFile] = useState(0);

    return (
        <Fragment>
            <div>
                <input type='file' onChange={e => setFile(e.target.files[0])}></input>
                <button onClick={onAdd.bind(this, newFile)}>ADD</button>
            </div>
        </Fragment>
    )
}

export default AddImage