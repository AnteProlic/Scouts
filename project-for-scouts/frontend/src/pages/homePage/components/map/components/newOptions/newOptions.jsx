import React, { Fragment } from 'react';
import './newOptions.css'

function NewOption(props) {
  
  const {legends} = props;

  return (
    <Fragment>
      {
        legends.map(el => {
          return(
            <option value={el.num} key={el._id}>{el.name}</option>
          )
        })
      }
    </Fragment>
  )
}

export default NewOption;