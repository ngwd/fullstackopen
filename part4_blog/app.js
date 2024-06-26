const mongoose = require('mongoose')
const config=require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const {errorHandler, requestLogger} = require('./utils/middleware')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const mongoUrl = config.MONGO_DB_URI 
mongoose.connect(mongoUrl).then(
  console.log('db conncted')
)

app.use(cors())
app.use(express.json())

if (process.env.NODE_ENV === 'TEST') {
  const testingRouter = require('./controllers/testing')
  app.use(requestLogger)
  app.use('/api/testing', testingRouter)
}
app.use('/api/login', loginRouter)
app.use('/api/users', userRouter)
app.use('/api/blogs', blogRouter)

app.use(errorHandler)
module.exports=app

