import axios from 'axios'

const phonebookApiPath = '/api/persons'

const getAll = async () => {
  const { data: people } = await axios.get(phonebookApiPath)
  return people
}

const addPerson = (newPerson) => {
  const { data: createdPerson } = await axios.post(phonebookApiPath, newPerson)
  return createdPerson
}

const deletePerson = (id) => {
  const { status } = await axios.delete(`${phonebookApiPath}/${id}`)
  return status
}

const updatePerson = (updatedPerson) => {
  const { data: savedPerson } = await axios.put(`${phonebookApiPath}/${updatedPerson.id}`, updatedPerson)
  return savedPerson
}

export default { getAll, addPerson, deletePerson, updatePerson }