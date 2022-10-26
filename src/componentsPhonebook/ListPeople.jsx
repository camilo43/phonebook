
// ***** WITHOUT POST *****

import e from "cors"

  // export const ListPeople = (props) => {     
  //   return <ul>
  //     {(props.arrayes).map((e,i)=><li key={i}>{e.name} - {e.number}</li>)}
  //   </ul>
  // }

//****** WITH POST ******

  export const ListPeople = (props) => {
    const confirmation = (nameDelete, idDelete) => {      
      if(window.confirm(`Do you want to delete ${nameDelete}`)){props.deleteContact(idDelete)} 
    }
    return <form onSubmit={confirmation}>
        <ul>
          {(props.arrayes).map((e,i)=>{
            return <li key={i}>{e.name} - {e.number}
              <br></br>
          <button type="submit" onClick={(f)=> {
                f.preventDefault();
                confirmation(e.name, e.id)
                }
              } 
                >Delete</button>
              <br></br>
              <br></br>
            </li>
          })}          
        </ul>

    </form>  
    
  }
