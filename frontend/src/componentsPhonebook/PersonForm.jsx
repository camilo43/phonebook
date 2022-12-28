/* eslint-disable react/prop-types */

import React from 'react'

export const PersonForm = (props) => {

  return <form onSubmit={props.onSubmitForm}>

      Contact's name: <input
      placeholder="Type the name"
      value={props.newName}
      onChange={props.onChangeEventName}
    />
    <br></br>
    <br></br>
            Phone number: <input
      placeholder='04X-XXXXXX'
      value={props.newNumber}
      onChange={props.onChangeEventNumber}
      maxLength="10"
    />

    <br></br>
    <button type="submit">add</button>

  </form>
}