import React, { Fragment, useEffect, useState } from 'react';
import './newMarker.css'
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet'
import axios from 'axios';
import 'reactjs-popup/dist/index.css';
import Button from '@material-ui/core/Button';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

function NewMarker(props) {

  const [cons, setCons] = useState([]);

  useEffect(() => {
    axios.get('/fileman/connect')
        .then(res => setCons(res.data));
  }, [])

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
          .then(res => window.location.reload(false))
          })
      }

    const {locations, legends, onDelete, onEdit, connections} = props;
    
     const myIcon = L.icon({
        iconUrl: require('../../../images/marker-icon-2x.png'),
        iconSize: [25, 41],
        iconAnchor: [12.5, 41],
        popupAnchor: [0, -41]
      });
        

    /*'../../../../../../../../backend/routes/static/'+elem.img_name */

    return (
        <Fragment>
            {
                locations.map(el => {
                    let coordinates = [el.coordinates.latitude, el.coordinates.longitude]

                    const legend = legends.filter(legend => legend.num == el.collection)[0];
                    console.log(legend)/* 
                    const imgName = connections.filter(imgName => legend._id == imgName.leg_id) */
                    
                    return(
                        <Marker key={el._id} position={coordinates} key={el._id} icon={myIcon}>
                            <Popup maxHeight='180' id='popup'>
                                <div id='font'>
                              <div id={el._id}>
                                <Button id='button'  color="" onClick={onEdit.bind(this, el._id)}><EditIcon id='edit1'/></Button>
                                <Button id='button1'  color="" onClick={onDelete.bind(this, el._id)}><DeleteIcon id='delete1'/></Button>
                                <br/>
                                <b>Collection:</b> {legends.map(elem => {
                                    if (elem.num === Number(el.collection)) {
                                        return(elem.name)
                                    }
                                })} 
                                <br></br>
                                <b>Location name:</b> {el.name}
                                <br></br>
                                <hr/>
                                <b>Description:</b>
                                <br/> 
                                {el.description}
                                <br></br>
                                <hr/>
                                <div id='images'><label className="custom-file-upload1">
                                    <input type="file" multiple onChange={e => {
                                        AddImg([e.target.files[0], el._id])
                                        }}/>
                                        {connections.map(elem => {
                                            if (elem.leg_id === el._id) {
                                                return <img src={elem.img_url} className='pfp1' ></img>
                                            }
                                        })}
                                    <i className="fa fa-cloud-upload" /><AddAPhotoIcon id='addimg1' />
                                </label></div>
                                
                              </div>
                              </div>
                            </Popup>
                        </Marker>
                    )
                })
            }
        </Fragment>
    )
};

export default NewMarker;




