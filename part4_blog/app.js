const mongoose = require('mongoose')
const config=require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')

const blogRouter = require('./controllers/blogs')

const mongoUrl = config.MONGO_DB_URI 
mongoose.connect(mongoUrl).then(
  console.log('db conncted')
)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)

module.exports=app

