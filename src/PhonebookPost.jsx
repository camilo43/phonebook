import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FilteredList } from './componentsPhonebook/FilteredList'
import { ListPeople } from './componentsPhonebook/ListPeople'
import { PersonForm } from './componentsPhonebook/PersonForm'
import notesPhonebook from './modules_phoneBookPost/notesPhonebookPost'

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

  const onChangeEventName = (event) => {
    setNewName(() => event.target.value)  
  }
  const onChangeEventNumber = (event) => {
    setNewNumber(()=> event.target.value)  
  }
  const onChangeFilter = (event) =>{
    setFilterNames(()=> event.target.value)   
  }

  const onSubmitFilter = (event) => {
    event.preventDefault();
  }

  useEffect(() => {
    notesPhonebook.getting()
        .then(response=> {setPersons(response)})  
  }, [newNumber])

  const filteredNames = (addPersons) => {
    const filtroGente = persons.filter(e=> e.name === newName)

    if(filtroGente.length>0){
        if(window.confirm(`${newName} is already in the list, do you want to update the old number?`)){           
            setNewName(()=> ""); setNewNumber(()=> "")
            notesPhonebook.putting(filtroGente[0].id, addPersons)
              .catch(()=>{
                setStylesRed(stylesError)
                setNotificationError(`${newName} has been deleted from the database`)
                setTimeout(()=> setNotificationError(""), 5000)
                setTimeout(()=> setStylesRed({}), 5000)
              })
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
    const addPersons = {
        name: newName,
        number: newNumber,
    }

    filteredNames(addPersons)
    
    }

  const deleteContact = (id) =>{      
     notesPhonebook.deleting(id)
     setPersons(persons.filter(e=> e.id !== id))
  }
    
  return (
    <div style={mainStyle}>
      <h1>Phonebook</h1>
      <h2>Find contact</h2>
      
      <FilteredList 
        persons={persons} 
        filterNames={filterNames} 
        onSubmitFilter={onSubmitFilter}
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