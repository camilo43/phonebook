  export const ListPeople = (props) => {    
    return <form>
        <ul>
          {(props.arrayes).map((e,i)=>{
            return <li key={i}> {e.name} - {e.number}
              <br></br>
                <button 
                  type="submit" onClick={(f)=> {
                      f.preventDefault();
                      if(window.confirm(`Do you want to delete ${e.name} ID number ${e._id}?`)){props.deleteContact(e._id, e.name)}
                      }
                    } 
                >Delete
                </button>
              <br></br>
              <br></br>
            </li>
          })}          
        </ul>

    </form>  
    
  }
