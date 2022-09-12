const Blog = require('../models/blog')

const initialBlogs = [
  { author: 'Eduardo', title: 'titulo', url: 'www.coiso.pt', likes: 0 },
  { author: 'Antrax', title: 'titulo2', url: 'www.coiso.pt', likes: 1 },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = { initialBlogs, blogsInDb }
