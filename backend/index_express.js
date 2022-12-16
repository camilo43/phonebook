// index.js

import {Book} from "./phonebookModel.js";
import express from "express";
import {connectDB} from './db.js'
import expressAsyncHandler from "express-async-handler";
import bodyParser  from "body-parser";
import cors from 'cors'
// Define "require"
import * as dotenv from 'dotenv'

dotenv.config()
const app = express()

app.use(express.json())
app.use(express.static('build'))

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

connectDB();

// app.get('/api/data', expressAsyncHandler(async (req,res,next)=>{  
//   res.send("PRUEBA RETORNO")
// }))

app.get('/api/data', expressAsyncHandler(async (req,res,next)=>{  
  const searchContacts = await Book.find()
  console.log("///Getting EXPRESS")
  try{
    res.status(200).json(searchContacts)
    console.log(">>CONTACTS SEARCHED")
  } catch(error){
    next(error)
  }  
 }))

app.post('/api/data', expressAsyncHandler(async (req,res,next)=>{   
   const entrance = await Book.create({
    name: req.body.name,
    number: req.body.number
  })
  let emptyFields = [];

  if(!req.body.name){
    emptyFields.push("Name")
  }
  if(!req.body.number){
    emptyFields.push("Number")
  }
  if(emptyFields > 0){    
    return res.status(400).json({error: 'Please add a text field', emptyFields})
  }
  console.log('>>>>>>>>>>>>>EMPTY FIELDS', emptyFields)
  res.status(200).json(entrance) 
}))

app.put('/api/data/:id', expressAsyncHandler(async(req,res,next)=>{
    if(!req.params.id){
    res.status(400)
    throw new Error('The contact was not found')
  }
  const updatedContact = await Book.findByIdAndUpdate(req.params.id, req.body, {new:true})
  res.status(200).json(updatedContact).catch(error => next(error))
}))

app.delete('/api/data/:id', expressAsyncHandler(async(req,res,next)=>{
  if(!req.params.id){
    res.status(400)
    throw new Error('The contact was not found')
  }
    await Book.deleteOne({_id:req.params.id})
    res.status(200).json({"contact status": "deleted"}).catch(error=>next(error))
}))

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })}
  next(error)
}
app.use(errorHandler)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const port = process.env.PORT || 3001

app.listen(port, () => {
console.log(`SERVER-EXPRESS running on port ${port}`)
})
