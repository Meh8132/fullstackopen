const User = require('../models/user')
const toPlainUser = user => user.toJSON()

const getUsersInDb = async () => {
  const users = await User.find({})
  return users.map(toPlainUser)
}

module.exports = {
  getUsersInDb,
}