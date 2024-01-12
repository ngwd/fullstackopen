const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const {userExtractor} = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { id:1, userName:1, name:1 })
    // .sort({'user.userName' : 1})
    // .sort({'likes' : 1}) // works
    // .sort({'user.id' : 1})
    .sort({'user' : 1})
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

blogRouter.post('/', userExtractor, async (request, response, next) => {
  const body = request.body
  const blog = new Blog ({
    url: body.url,
    author: body.author,
    like: body.likes,
    title: body.title,
    user: [request.user]
  })
  try {
    const savedBlog= await blog.save()

    response.status(201).json(savedBlog)

    const user = await User.findById(request.user)
    user.blogs =  user.blogs.concat(savedBlog._id)
    await user.save()
  }
  catch(exception) {
    next(exception)
  }
})

blogRouter.post('/:id/comment', userExtractor, async (request, response, next) => {
  try {
    // const newComment = JSON.parse(JSON.toString(request.body))
    const newComment = request.body
    const id = request.params.id
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { $push: { comments: newComment.comment } },
      { new: true }
    )
    response.status(201).json(updatedBlog)
  }
  catch(exception) {
    next(exception)
  }
})

blogRouter.delete('/:id', userExtractor, async(req, res, next) =>{
  try {
    const userId = req.user
    const blog = await Blog.findById(req.params.id)
    const adderId = blog.user?.toString()??null
    if (adderId === userId) {
      await Blog.findByIdAndDelete(req.params.id)
      res.status(204).end()
    }
    else {
      res.status(401).json({
        error: 'you are not authorized to delete'
      })
    }
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
