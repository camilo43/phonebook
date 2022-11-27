// index.js
import express from "express";
import {connectDB} from './db.js'
import { Book } from "./phonebookModel.js";
import expressAsyncHandler from "express-async-handler";
import bodyParser  from "body-parser";

// Define "require"
import { createRequire } from "module";
import { model } from "mongoose";
const require = createRequire(import.meta.url);
const dotenv = require('dotenv').config()
const cors = require('cors')
const app = express()
app.use(express.json())

// app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

connectDB();

app.get('/api/data', expressAsyncHandler(async (req,res,next)=>{  
  const searchContacts = await Book.find()
  try{
    res.status(200).json(searchContacts)
  } catch(error){
    next(error)
  }  
}))

app.post('/api/data', expressAsyncHandler(async (req,res,next)=>{  
  if(!req.body.name){
    res.status(400)
    throw new Error('Please add a text field')
  }

  const entrance = await Book.create({
    name: req.body.name,
    number: req.body.number
  })
  res.status(200).json(entrance).catch(error => next(error)) 
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
console.log(`SERVER running on port ${port}`)
})
