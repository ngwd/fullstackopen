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

test('api-retrieve all and check count', async ()=> {
  const res = await api.get('/api/blogs/')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const blogsGet = res.body

  expect(blogsGet).toHaveLength(helper.blogs.length)
  expect(blogsGet[0].id).toBeDefined()
  expect(blogsGet[0]._id).not.toBeDefined()
  expect(blogsGet[0].__v).not.toBeDefined()
})
describe ("create", ()=> {
test ('api-create one blog and check', async ()=>{
  const newBlog = {
    title:"React build & up",
    author:"Sobolev",
    url:"http://localhost",
  }
  const res = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const newBlogPost = res.body
  const newBlogId = newBlogPost.id 

  const res2 = await api
    .get('/api/blogs')
    .expect(200)

  expect(res2.body).toHaveLength(helper.blogs.length + 1)

  const res3 = await api
    .get(`/api/blogs/${newBlogId}`)
    .expect(200)
  const newBlogGet = res3.body

  expect(newBlogGet.likes).toBeDefined()
  newBlogPost.likes = 0
  expect(newBlogGet).toEqual(newBlogPost) 
})

test ('api-create one blog and check-invalid request 400 expected', async ()=>{
  const newBlog = {
    title:"",
    author:"Sobolev",
    url:null,
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
  
  const res2 = await api
    .get('/api/blogs')
    .expect(200)

  expect(res2.body).toHaveLength(helper.blogs.length)
})
})

afterAll(async ()=> {
  await mongoose.connection.close()
})