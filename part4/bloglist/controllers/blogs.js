const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
  const body = request.body
  const userFromRequest = request.user

  const user = await User.findById(userFromRequest.id)
  const blog = new Blog({
    author: body.author,
    likes: body.likes,
    title: body.title,
    url: body.url,
    user: user._id,
  })

  if (!blog.title || !blog.url) {
    response.status(400).end()
  } else {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  }
})

blogsRouter.put('/:id', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
  const body = request.body

  const blog = {
    author: body.author,
    likes: body.likes,
    title: body.title,
    url: body.url,
    user: body.user.id,
  }
  let updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(200).json(updatedBlog)
})

blogsRouter.delete('/:id', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
  const user = request.user
  const userId = user.id
  const blog = await Blog.findById(request.params.id)
  //Untreated exception : Check if user has blog or if blog exists
  if (!blog.user.toString() === userId.toString()) {
    return response.status(403).json({ error: 'operation is not authorized' })
  } else {
    blog.remove()
    response.status(204).end()
  }
})

module.exports = blogsRouter
