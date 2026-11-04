import { useEffect, useState } from 'react'
import peopleService from './services/Persons'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'

const App = () => {
  const [people, setPeople] = useState([])
  const [pendingName, setPendingName] = useState('')
  const [pendingNumber, setPendingNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  const handlePendingNameChange = (event) => setPendingName(event.target.value)
  const handlePendingNumberChange = (event) => setPendingNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  const notify = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 5000)
  }

  useEffect(() => {
    peopleService
      .getAll()
      .then(fetchedPeople => setPeople(fetchedPeople))
      .catch(error => notify(error.response.data.error, 'error'))
  }, [])

  const handlePersonDelete = (id) => {
    const person = people.find((person) => person.id === id)
    if (window.confirm(`Delete ${person.name} ?`)) {
      peopleService
        .deletePerson(id)
        .then(() => {
          setPeople(current => current.filter(currentPerson => currentPerson.id !== id))
          notify(`Deleted ${person.name}`, 'success')
        })
        .catch(error => {
          setPeople(current => current.filter(currentPerson => currentPerson.id !== id))
          notify(error.response.data.error, 'error')
        })
    }
  }

  const createPerson = (newPerson) => {
    peopleService
      .addPerson(newPerson)
      .then(newPerson => {
        setPeople(current => current.concat(newPerson))
        setPendingName('')
        setPendingNumber('')
        notify(`Added ${newPerson.name}`, 'success')
      })
      .catch(error => {
        notify(error.response.data.error, 'error')
      })
  }

  const replacePerson = (personToUpdate) => {
    peopleService
      .updatePerson(personToUpdate)
      .then(savedPerson => {
        setPeople(current => current.map(person => (
          person.id !== savedPerson.id ? person : savedPerson
        )))
        setPendingName('')
        setPendingNumber('')
        notify(`Updated ${personToUpdate.name}`, 'success')
      })
      .catch(error => {
        if (error.response.statusCode === 404) {
          setPeople(current => current.filter(person => person.id !== personToUpdate.id))
          setPendingName('')
          setPendingNumber('')
        }
        notify(error.response.data.error, 'error')
      })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const updatePrompt = 'is already added to phonebook, replace old number with the new one?'
    const existingPerson = people.find(person => person.name === pendingName)
    if (existingPerson) {
      if (window.confirm(`${existingPerson.name} ${updatePrompt}`)) {
        replacePerson({ ...existingPerson, number: pendingNumber })
      }
    } else {
      createPerson({ name: pendingName, number: pendingNumber })
    }
  }

  const visiblePeople = filter === ''
    ? people
    : people.filter((person) => person.name.includes(filter))

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notification={notification} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        newName={pendingName}
        newNumber={pendingNumber}
        handleNameChange={handlePendingNameChange}
        handleNumberChange={handlePendingNumberChange}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons
        persons={visiblePeople}
        handlePersonDelete={handlePersonDelete}
      />
    </div>
  )
}

export default App