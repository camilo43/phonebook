
 export const FilteredList = (props) => { 
    let persons = props.persons
    let filteredNames = props.filterNames
    let previewList = props.previewList
    let onChangeFilter = props.onChangeFilter

    let respuesta = persons.filter(e=> previewList==="" || previewList===" "? previewList="-" : (e.name).toLowerCase().includes(previewList.toLowerCase()))
    
    return <form onSubmit={props.onSubmitFilter}>
            <input
                placeholder="Search..."
                value={filteredNames}
                onChange={onChangeFilter}
            />
            <p>Results from your contact list:</p>
            <ul>
                {respuesta.map((e,i) => {
                    if(previewList==="" || previewList==="-"){
                    return 
                    } else {
                        return <li key={i}>{e.name} - {e.number}</li>
                    }       
                    })
                }    
                {/* {results.map((e,i) => {
                    if(results){
                        return <li key={i}>{filteredNames} {e.number}</li>
                    }               
                    }) 
                }             */}
            </ul>
        </form>    
  }
