const app = require('../app')

const mongoose = require('mongoose')
mongoose.set('bufferTimeoutMS', 30000)

const supertest = require('supertest')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async() =>{
  await Blog.deleteMany({})
  const blogObjs = helper.blogs.map(blog=>new Blog(blog))
  const promiseArray = blogObjs.map(blog=>blog.save())
  await Promise.all(promiseArray)
})

test('retrieve all and check count', async ()=> {
  const res = await api.get('/api/blogs/')
  expect(res.body).toHaveLength(helper.blogs.length)
})

afterAll(async ()=> {
  await mongoose.connection.close()
})