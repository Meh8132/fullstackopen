const shouldLog = () => process.env.NODE_ENV !== 'test'

const info = (...params) => shouldLog() && console.log(...params)

const error = (...params) => shouldLog() && console.log(...params)

module.exports = {
  info,
  error,
}