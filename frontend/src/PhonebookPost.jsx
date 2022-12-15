import {notesPhonebook} from './axios_phoneBookPost/notesPhonebookPost.jsx'
import { PersonForm } from './componentsPhonebook/PersonForm'
import { useEffect, useState } from 'react'
import { FilteredList } from './componentsPhonebook/FilteredList'
import { ListPeople } from './componentsPhonebook/ListPeople'

export const PhonebookPost = () => {
 
  const mainStyle = {
    color: 'black',
    fontFamily: 'helvetica'       
  }
  const stylesNotification = {
    color: 'green',
    fontSize: 19,
    backgroundColor: 'lightGrey',
    height:60,
    width: 500,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
  
  const stylesError = {
    color: 'red',    
    fontSize: 19,
    backgroundColor: 'lightGrey',
    height:60,
    width: 500,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
  const [newNumber, setNewNumber] = useState("")
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [filterNames, setFilterNames] = useState("")

  const [notificationError, setNotificationError] = useState("")
  const [ notificationAdd, setNotificationAdd] = useState("")
  const [ stylesGreen, setStylesGreen] = useState({})
  const [ stylesRed, setStylesRed] = useState({})
  const [ boolean, setBoolean] = useState(false)

  const onChangeEventName = (event) => {
    setNewName(() => event.target.value)  
  }
  const onChangeEventNumber = (event) => {
    setNewNumber(()=> event.target.value)
  }
  const onChangeFilter = (event) =>{
    setFilterNames(()=> event.target.value)   
  }
  // const onSubmitFilter = (event) => {
  //   event.preventDefault();
  // }  
  const addPersons = {
    name: newName,
    number: newNumber,
}

  let exampleFilter = persons.filter(e=> e.name === newName)
  const filteredNames = async (addPersons) => { 
    if(exampleFilter.length>0){      
            if(window.confirm(`${newName} is already in the list, do you want to update the old number?`)){
            //notesPhonebook.putting(filtroGente[0]._id, addPersons)
            await notesPhonebook.putting(exampleFilter[0]._id, addPersons)
            // notesPhonebook.getting()
            // .then(response=> {setPersons(response)})
            setStylesGreen(stylesNotification)
            setBoolean(!boolean)
            console.log("PERSONS", persons)
            // setTimeout(()=> setBoolean(!boolean), 500)
            setNotificationAdd(`Contact: '${newName}' has been updated`)
            setTimeout(()=> setStylesGreen({}), 5000)
            setTimeout(()=> setNotificationAdd(""), 5000)
            setNewName(()=> ""); 
            setNewNumber(()=> "")
            exampleFilter = null
            console.log("BOOLEAN<<<1", boolean)
            
        } else {
            setNewName(()=> ""); setNewNumber(()=> "")
        }
        
    }else{
        notesPhonebook.posting(addPersons)
        .then(resolve => {
            setPersons(()=> persons.concat(resolve))
            setStylesGreen(stylesNotification)
            setNotificationAdd(`New contact: '${newName}' has been added`)
            setTimeout(()=> setStylesGreen({}), 5000)
            setTimeout(()=> setNotificationAdd(""), 5000)
            setNewName(()=> "")
            setNewNumber(()=> "")
            
        })
    }}

  const onSubmitForm = (event) => {
    event.preventDefault();
    filteredNames(addPersons)
    }

  useEffect(() => {
    console.count()
    notesPhonebook.getting()
        .then(response=> {setPersons(response)})
        console.log("PERSONS", persons)
  }, [boolean])

  const deleteContact = (id, name) =>{
     const filteredPersons = persons.filter(e=> e._id !== id)
     notesPhonebook.deleting(id)
     setPersons(filteredPersons) 
      setStylesRed(stylesError)
      setNotificationError(`${name} has been deleted from the database`)
      setTimeout(()=> setNotificationError(""), 5000)
      setTimeout(()=> setStylesRed({}), 5000)
    }
      
  return (
    <div style={mainStyle}>
      <h1>Phonebook</h1>
      <h3>Changing .env Var</h3>
      <h2>Find contact</h2>
      
      <FilteredList 
        persons={persons} 
        filterNames={filterNames} 
        onSubmitForm={onSubmitForm}
        onChangeFilter={onChangeFilter}
        />
      
      <h2>Add contact</h2>
      <p style={stylesGreen}>{notificationAdd}</p>
      <p style={stylesRed}>{notificationError}</p>
      <PersonForm 
        onSubmitForm={onSubmitForm} 
        newName={newName} 
        onChangeEventName={onChangeEventName}
        newNumber={newNumber}
        onChangeEventNumber={onChangeEventNumber}
        />

      <h2>Numbers</h2>
      <ListPeople 
        arrayes={persons}
        deleteContact={deleteContact}
        />
        {/* {persons.map(e=> <li>{e.name}</li>)} */}
    </div>
  )
}