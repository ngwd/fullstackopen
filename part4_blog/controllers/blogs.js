const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.status(200).json(blog)
    }
    else {
      response.status(404).end()
    }
  }
  catch (exception) {
    next(exception)
  }
})

blogRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)
  try {
    const savedBlog= await blog.save()
    response.status(201).json(savedBlog)
  }
  catch(exception) {
    next(exception)
  }
})

blogRouter.delete('/:id', async(req, res, next) =>{
  try {
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
  }
  catch (exception) {
    next(exception)
  }
})

blogRouter.put('/:id', async (req, res, next) => {
  const body = req.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  try {
    const result = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true})
    res.json(result)
  }
  catch (exception) {
    next(exception)
  }
})
module.exports = blogRouter 
