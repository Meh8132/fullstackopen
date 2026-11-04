require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/Person')

const app = express()
const PERSONS_API_PATH = '/api/persons'

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('body', (request, response) => JSON.stringify(request.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get(PERSONS_API_PATH, (request, response, next) => {
  Person.find({})
    .then((persons) => {
      response.json(persons)
    })
    .catch((error) => next(error))
})

app.get(`${PERSONS_API_PATH}/:id`, (request, response, next) => {
  const { id } = request.params
  Person.findById(id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).send({ error: 'person not found' })
      }
    })
    .catch((error) => next(error))
})

app.put(`${PERSONS_API_PATH}/:id`, (request, response, next) => {
  const { id } = request.params
  const personData = request.body
  Person.findByIdAndUpdate(id, personData, { new: true, runValidators: true })
    .then((updatedPerson) => {
      if (updatedPerson) {
        response.json(updatedPerson)
      } else {
        response.status(404).send({ error: 'person not found' })
      }
    })
    .catch((error) => next(error))
})

app.delete(`${PERSONS_API_PATH}/:id`, (request, response, next) => {
  const { id } = request.params
  Person.findByIdAndDelete(id)
    .then((deletedPerson) => {
      if (deletedPerson) {
        response.status(204).end()
      } else {
        response.status(404).send({ error: 'person not found' })
      }
    })
    .catch((error) => {
      next(error)
    })
})

app.post(PERSONS_API_PATH, (request, response, next) => {
  const { name, number } = request.body
  const person = new Person({ name, number })
  person.save()
    .then((savedPerson) => {
      response.json(savedPerson)
    })
    .catch((error) => next(error))
})

app.get('/info', async (request, response, next) => {
  try {
    const personCount = await Person.countDocuments({})
    response.send(`<p>Phonebook has info for ${personCount} people<p>${new Date()}`)
  } catch (error) {
    next(error)
  }
})

const handleUnknownEndpoint = (request, response) => {
  response.status(404).json({ error: 'unknown endpoint' })
}

const handleError = (error, request, response, next) => {
  console.log(error.message)
  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' })
  } if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(handleUnknownEndpoint)
app.use(handleError)

const { PORT } = process.env
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
