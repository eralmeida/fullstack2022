const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)
const helper = require('../utils/test_helper')
const bcrypt = require('bcrypt')

let token = ''

beforeEach(async () => {

  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash, name: 'eduardo' })
  await user.save()

  await Blog.deleteMany({})
  var blogsWithUser = helper.initialBlogs.map(blog => new Blog({ ...blog, user: user })
  )
  await Blog.insertMany(blogsWithUser)

  var loginResponse = await api.post('/api/login').send({ username: 'root', password: 'sekret' })
  token = loginResponse.body.token
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blog has id property', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('can post new valid blog', async () => {
  const dummyBlog = { author: 'dummyAuthor', title: 'dummyTitle', url: 'dummyUrl.com', likes: 3 }
  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(dummyBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const response = await api.get('/api/blogs')
  const authors = response.body.map((r) => r.author)
  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(authors).toContain('dummyAuthor')
})

test('likes property defaults to zero', async () => {
  const newBlog = { author: 'me', title: 'my title', url: 'my_url.com' }
  const response = await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBe(0)
})

test('new blog without title or url must return code 400', async () => {
  const newBlog = { author: 'me' }
  await api.post('/api/blogs').set('Authorization', `bearer ${token}`).send(newBlog).expect(400)
})

test('delete with status code 204 if id is valid', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]
  await api.delete(`/api/blogs/${blogToDelete.id}`).set('Authorization', `bearer ${token}`).expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

  const titles = blogsAtEnd.map((b) => b.title)
  expect(titles).not.toContain(blogToDelete.title)
})

afterAll(() => {
  mongoose.connection.close()
})
