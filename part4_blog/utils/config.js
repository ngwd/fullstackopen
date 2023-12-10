require('dotenv').config()
const PORT = process.env.PORT
const ENV = process.env.NODE_ENV
const MONGO_DB_URI = process.env[`${ENV}_MONGODB_URI`]
module.exports = {
  MONGO_DB_URI, 
  PORT
}