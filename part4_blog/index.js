const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
require('dotenv').config()

const mongoUrl = process.env.MONGODB_URI 
mongoose.connect(mongoUrl).then(
  console.log('db conncted')
)

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter);

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})