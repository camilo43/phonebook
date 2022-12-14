
 export const FilteredList = (props) => { 
    let persons = props.persons
    let filteredNames = props.filterNames

    let results = persons.filter((e)=> { return e.name === filteredNames})
    
    return <form onSubmit={props.onSubmitFilter}>
            <input
              value={props.filterNames}
              onChange={props.onSubmitForm}
            />
            <p>Results from your contact list:</p>
            <ul>
                {results.map((e,i) => {
                    if(results){
                        return <li key={i}>{filteredNames} {e.number}</li>
                    }               
                    }) 
                }            
            </ul>
        </form>    
  }
