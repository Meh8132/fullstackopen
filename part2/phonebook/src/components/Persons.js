const Person = ({ person, handlePersonDelete }) => {
  const { name, number, id } = person
  return (
    <div>
      <span>{name} {number} </span>
      <button onClick={() => handlePersonDelete(id)}>Delete</button>
    </div>
  )
}

const Persons = ({ persons, handlePersonDelete }) => {
  return (
    <div>
      {persons.map(person => (
        <Person
          key={person.id}
          person={person}
          handlePersonDelete={handlePersonDelete}
        />
      ))}
    </div>
  )
}

export default Persons