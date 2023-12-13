const app = require('../app')

const mongoose = require('mongoose')
mongoose.set('bufferTimeoutMS', 30000)

const supertest = require('supertest')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
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
test ('beforeEach', ()=>{ })
describe ("blog-create", ()=> {
  test ('api-blog-create0 one blog and check', async ()=>{
    const newBlog = {
      title:"React build & up -1111",
      author:"Sobolev",
      url:'http://localhost',
      user:'6577580dc5bbebfd7ead8a40'
    }

    const res0 = await api
    .get(`/api/users/${newBlog.user}`)
    .expect(200)
    const userName = res0.body.userName
    const originalBlogCount = res0.body.blogs.length
    console.log('original blog count is ', originalBlogCount)

    const token = helper.getToken(userName, newBlog.user)

    const res = await api
      .post('/api/blogs')
      .set('Authorization',`Bearer ${token}`)
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
    expect(newBlogGet.user).toBeDefined()
    newBlogPost.likes = 0
    expect(newBlogGet).toEqual(newBlogPost) 

    const res4 = await api
    .get(`/api/users/${newBlog.user}`)
    .expect(200)
    const blogCount = res4.body.blogs.length
    console.log('new blog count is ', blogCount)
    expect(blogCount).toBe(originalBlogCount+1)

  })

  test ('api-blog-create1 one blog and check-invalid request 400 expected', async ()=>{
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
describe('delete', ()=>{
  test('deleting an existing record', async()=>{
    const idx = Math.floor(Math.random()*helper.blogs.length)
    const blogIdToBeDeleted = helper.blogs[idx]._id
    await api
      .delete(`/api/blogs/${blogIdToBeDeleted}`)
      .expect(204)
    
    await api
      .get(`/api/blogs/${blogIdToBeDeleted}`)
      .expect(404)

    const res3 = await api
      .get('/api/blogs/')
      .expect(200)
    expect(res3.body).toHaveLength(helper.blogs.length-1)
  })
  test('deleting an un-existing record', async ()=>{
    const idx = Math.floor(Math.random()*helper.blogs.length)
    const blogIdToBeDeleted = helper.blogs[idx]._id
    await api
      .delete(`/api/blogs/${blogIdToBeDeleted}`)
      .expect(204)
    
    await api
      .get(`/api/blogs/${blogIdToBeDeleted}`)
      .expect(404)

    const res3 = await api
      .get('/api/blogs/')
      .expect(200)

    expect(res3.body).toHaveLength(helper.blogs.length-1)

    // delete 2nd time
    await api
      .delete(`/api/blogs/${blogIdToBeDeleted}`)
      .expect(204)

    const res4 = await api
      .get('/api/blogs')
      .expect(200)
    expect(res4.body).toHaveLength(helper.blogs.length-1)
  })  
})

describe('update ', ()=>{
  test ('update an existing record', async () => {
    const idx = Math.floor(Math.random()*helper.blogs.length)
    const temp1 = new Blog(helper.blogs[idx])
    const temp = temp1.toJSON()
    const newBlog = {...temp, likes:temp.likes + 1} 

    const res = await api
      .put(`/api/blogs/${newBlog.id}`)
      .send(newBlog)
      .expect(200)

    expect(res.body.likes).toBe(helper.blogs[idx].likes + 1)
  })
  // test ()
})

afterAll(async ()=> {
  await mongoose.connection.close()
})