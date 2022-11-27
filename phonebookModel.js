import mongoose, { model } from 'mongoose'
import express from "express";

const app = express()

const phonebookSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please add a text value']
    },
    number:{
        type: String,
        required:[true, 'Please enter the phone number']
    }
})

const Book = new mongoose.model('phonebookDB', phonebookSchema)
//model.exports = new mongoose.model('phonebookDB', phonebookSchema)

const port = 3011
app.listen(port, () => {
console.log(`SERVER-MONGO running on port ${port}`)
})

export {Book};