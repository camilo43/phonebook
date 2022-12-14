import mongoose from 'mongoose'
import express from 'express'

const app = express()

const phonebookSchema = new mongoose.Schema({
  name:{
    type: String,
    required: [true, 'Please add a text value'],
    minLength: [3, 'Name should be longer than 3 characters']
  },
  number:{
    type: String,
    validate: {
      validator: function(v) {
        return /\d{3}-\d{7}/.test(v)
      } },
    required:[true, 'Please enter the phone number'],

  }
})

const Book = new mongoose.model('phonebookDB', phonebookSchema)
// module.exports = mongoose.model('phonebookDB', phonebookSchema)

// console.log("BOOK", model.exports = mongoose.model('phonebookDB', phonebookSchema))
// console.log("BOOK2", Book)


const port = 3011
app.listen(port, () => {
  console.log(`SERVER-MONGO running on port ${port}`)
})

export { Book }