const blogRouter = require('express').Router()
const requestMiddleware = require('../utils/middleware')
const Blog = require('../models/blog')

blogRouter.post('/', requestMiddleware.userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body
  const { user } = request
  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id,
  })
  const createdBlog = await blog.save()
  user.blogs = user.blogs.concat(createdBlog._id)
  await user.save()
  response.status(201).json(createdBlog)
})

blogRouter.get('/', async (request, response) => {
  const allBlogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(allBlogs)
})

blogRouter.put('/:id', async (request, response) => {
  const { id } = request.params
  const modifiedBlog = await Blog.findByIdAndUpdate(
    id,
    request.body,
    { new: true, runValidators: true }
  )
  if (modifiedBlog) {
    response.json(modifiedBlog)
  } else {
    response.status(404).end()
  }
})

blogRouter.delete('/:id', requestMiddleware.userExtractor, async (request, response) => {
  const { user } = request
  const { id } = request.params
  const blog = await Blog.findById(id)
  if (!(user && blog)) {
    return response.status(401).json({
      error: 'invalid user or blog'
    })
  }
  if (user._id.toString() !== blog.user.toString()) {
    return response.status(401).json({
      error: 'you are not authorized to perform this operation',
    })
  }
  await Blog.findByIdAndDelete(blog._id)
  response.status(204).end()
})

module.exports = blogRouter