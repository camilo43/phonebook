import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())

const persons = [
    {
      name: "Arto Hellas",
      number: "040-123456",
      id: 1
    },
    {
      name: "Ada Lovelace",
      number: "39-44-5323523",
      id: 2
    },
    {
      name: "Dan Abramov",
      number: "12-43-234345",
      id: 3
    },
    {
      name: "Mary Poppendieck",
      number: "39-23-6423122",
      id: 4
    },
    {
      name: "pepelin",
      number: "1231",
      id: 5
    },
    {
      name: "sdfgsf",
      number: "45",
      id: 6
    }
  ]

app.get('/', (req, res)=> {
   res.json(persons)
})

const port = process.env.PORT || 3001
app.listen(port, () => {
console.log(`Server running on port ${port}`)
})