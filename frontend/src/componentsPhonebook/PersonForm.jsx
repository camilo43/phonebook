export const PersonForm = (props) => {
  return <form onSubmit={props.onSubmitForm}>    
        <div>
          Name: <input 
            placeholder="Contact's name"
            value={props.newName}
            onChange={props.onChangeEventName}            
            />
            <br></br>
            <br></br>
            Number: <input 
              placeholder='Type the mobile number'
              value={props.newNumber}
              onChange={props.onChangeEventNumber}
            />
        </div>
        <div>
          <br></br>
          <button type="submit">add</button>
        </div>
      </form>
}