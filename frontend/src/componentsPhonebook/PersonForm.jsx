export const PersonForm = (props) => {
  
  return <form onSubmit={props.onSubmitForm}>    
        <div>
          Contact's name: <input 
            placeholder="Type the name"
            value={props.newName}
            onChange={props.onChangeEventName}            
            />
            <br></br>
            <br></br>
            Phone number: <input 
              placeholder='04X - XXX - XXXX'
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