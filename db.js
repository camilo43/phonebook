import express from 'express'
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')

const app = express()

export const connectDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch(error){
        console.log(error);
        process.exit(1)
    }
}


const port = 3010
app.listen(port, () => {
console.log(`SERVIDOR DB running on port ${port}`)
})