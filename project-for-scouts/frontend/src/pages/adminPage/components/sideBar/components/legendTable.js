import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import './legendTable.css';
import Collapsible from 'react-collapsible';
import RoomIcon from '@material-ui/icons/Room';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

function LegendTable(props){

    function AddImg(e) {
        var formData = new FormData();
        formData.append('legend_image', e[0]);
          axios
          .post('/fileman/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(res => console.log(res))
        axios
          .get('/fileman/'+e[0].name)
          .then(resp => {
            axios
            .post('/fileman/connect', {
              img_name: e[0].name,
              leg_id: e[1],
              img_url: resp.config.url})
            .then(res => {
                    window.location.reload(false);
                })
            })
        }

    const { legends, locations, connections, onDelete, onEdit } = props;

    return(
        <Fragment id='frag'>
            {legends.map(legend => {
                return(
                    <div>
                    <label className="custom-file-upload">
                        <input type="file" multiple onChange={e => {AddImg([e.target.files[0], legend._id])}}/>
                            {connections.map(el => {
                                if (el.leg_id === legend._id) {
                                    return <img src={el.img_url} style={{width: "31px", height: "31px"}} id="pfp"></img>
                                }
                            })}
                            <i className='fa fa-cloud-upload'/><AddAPhotoIcon id='addimg'/>
                     </label>
                    <Button type='button' id='delete' className="deleteButton" onClick={onDelete.bind(this, legend._id)}><DeleteIcon /></Button>
                    <Button type='button' id='edit' className="deleteButton" onClick={onEdit.bind(this, legend._id)}><EditIcon /></Button>
                    <Collapsible id='colp' key={legend._id} open transitionTime='20' trigger={<div id='col-name'>
                    <div className='legendName'>{legend.name}</div> 
                    </div>}>
                        {
                            locations.filter(location => location.collection === String(legend.num)).map(el => {
                                return <Collapsible key={el._id} transitionTime='20' trigger={<div id='location'><RoomIcon id='icon'/><div>{el.name}</div></div>}><div id='text-disc'>{el.description}</div></Collapsible>
                            })
                        }
                    </Collapsible>
                    </div>
                )
            })}
        </Fragment>  
    );
}

export default LegendTable;