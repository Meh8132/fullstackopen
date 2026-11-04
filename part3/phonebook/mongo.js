const mongoose = require('mongoose')

const databasePassword = process.argv[2]
const databaseUrl = `mongodb+srv://fullstack:${databasePassword}@cluster0.cjh6j.mongodb.net/persons?retryWrites=true&w=majority`

const personName = process.argv[3]
const phoneNumber = process.argv[4]

if (databasePassword) {
  mongoose
    .connect(databaseUrl)
    .then(() => {
      const personSchema = new mongoose.Schema({
        name: String,
        number: String,
      })
      const Person = mongoose.model('Person', personSchema)
      if (!personName || !phoneNumber) {
        Person
          .find({})
          .then((results) => {
            console.log('phonebook:')
            results.forEach((person) => {
              console.log(`${person.name} ${person.number}`)
            })
            mongoose.connection.close()
          })
      } else {
        const newPerson = new Person({ name: personName, number: phoneNumber })
        newPerson
          .save()
          .then((savedPerson) => {
            console.log(`added ${savedPerson.name} number ${savedPerson.number} to phonebook`)
            mongoose.connection.close()
          })
      }
    })
    .catch((error) => {
      console.error('error: unable to connect to database!')
    })
} else {
  console.log('error: please provide database password!')
}
