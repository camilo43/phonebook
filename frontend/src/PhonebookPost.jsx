import React from 'react'
import { notesPhonebook } from './axios_phoneBookPost/notesPhonebookPost.jsx'
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
  const [newNumber, setNewNumber] = useState('')
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [filterNames, setFilterNames] = useState('')
  const [previewList, setPreviewList] = useState('-')
  const [upperCaseNames, setUppercaseNames]= useState('')

  const [notificationError, setNotificationError] = useState('')
  const [ notificationAdd, setNotificationAdd] = useState('')
  const [ stylesGreen, setStylesGreen] = useState({})
  const [ stylesRed, setStylesRed] = useState({})
  const [ boolean, setBoolean] = useState(false)

  const onChangeEventName = (event) => {
    setNewName(() => {
      return newName.length<1? event.target.value.toUpperCase() : event.target.value
    })
    setUppercaseNames(() => newName)
  }

  const onChangeEventNumber = (event) => {
    setNewNumber(() => event.target.value)
  }

  const onChangeFilter = (event) => {
    setFilterNames(() => event.target.value)
    setPreviewList(() => event.target.value)
    console.log('PREVIEWLIST', previewList)
  }

  const onSubmitFilter = (event) => {
    event.preventDefault()
  }

  const addPersons = {
    name: upperCaseNames,
    number: formatPhoneNumber(newNumber),
  }

  const timerBannerRed = () => {
    setTimeout(() => setStylesRed({}), 5000)
    setTimeout(() => setNotificationError(''), 5000)
  }
  const timerBannerGreen = () => {
    setTimeout(() => setStylesGreen({}), 5000)
    setTimeout(() => setNotificationAdd(''), 5000)
  }

  const clearTextBox  = () => {
    setNewName(() => '')
    setNewNumber(() => '')
  }

  let exampleFilter = persons.filter(e => e.name === newName)

  function formatPhoneNumber(value) {
    if (!value) return value
    const phoneNumber = value.replace(/[^\d]/g, '')
    const phoneNumberLength = phoneNumber.length
    if (phoneNumberLength < 4) return phoneNumber
    if (phoneNumberLength < 7) {
      console.log('TEST SLICING1', `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3)}`)
      return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3)}`
    }
    console.log('TEST SLICING2', `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 10)}`)
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 10)}`
  }

  const posting = () => {
    if(exampleFilter.length<=0){
      notesPhonebook.posting(addPersons)
        .then(resolve => {
          setPersons(() => persons.concat(resolve))
          setStylesGreen(stylesNotification)
          setNotificationAdd(`New contact: '${upperCaseNames}' has been added`)
          timerBannerGreen()
        })
    } else {
      return
    }
  }

  const checkPost = async() => {
    if(exampleFilter.length>0){
      if(window.confirm(`${upperCaseNames} is already in the list, do you want to update the old number?`)){
        await notesPhonebook.putting(exampleFilter[0]._id, addPersons)
        setStylesGreen(stylesNotification)
        setBoolean(!boolean)
        setNotificationAdd(`Contact: '${upperCaseNames}' has been updated`)
        timerBannerGreen()
        exampleFilter = null
        return
      }
    }
  }
  const onSubmitForm = async (event) => {
    event.preventDefault()
    if(addPersons.name === '' || addPersons.number === ''){
      setStylesRed(stylesError)
      setNotificationError('Please add name and number before saving')
      timerBannerRed()
      setNotificationAdd('')
    } else if(addPersons.name.length <= 3){
      setStylesRed(stylesError)
      setNotificationError('The name must have more than 3 letters')
      timerBannerRed()
    } else {
      checkPost()
      posting()
    }
    clearTextBox()
  }

  useEffect(() => {
    notesPhonebook.getting()
      .then(response => {setPersons(response)})
    console.log('PERSONS', persons)
  }, [boolean])

  useEffect(() => {
    if(newName.includes(' ')){
      const secondIndex = newName.indexOf(' ')
      console.log('nEW NAM', newName)
      const secondUpper = newName.slice(secondIndex+1, secondIndex+2).toUpperCase()
      const slicing = newName.slice(secondIndex+2)
      console.log('SLICING', newName.slice(0, secondIndex), secondUpper + slicing)

      setUppercaseNames(() => newName.slice(0, secondIndex+1) + secondUpper + slicing)
    } else {
      setUppercaseNames(() => newName)
    }
  },[newName])

  const deleteContact = (id, name) => {
    const filteredPersons = persons.filter(e => e._id !== id)
    notesPhonebook.deleting(id)
    setPersons(filteredPersons)
    setStylesRed(stylesError)
    setNotificationError(`${name} has been deleted from the database`)
    timerBannerRed()
  }

  return (
    <div style={mainStyle}>
      <h1>Phonebook</h1>
      <h2>Find contact</h2>

      <FilteredList
        persons={persons}
        filterNames={filterNames}
        onChangeFilter={onChangeFilter}
        onSubmitFilter={onSubmitFilter}
        previewList={previewList}
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