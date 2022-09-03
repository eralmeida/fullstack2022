const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

const initialBlogs = [
  { author: 'Eduardo', title: 'titulo', url: 'www.coiso.pt', likes: 0 },
  { author: 'Antrax', title: 'titulo2', url: 'www.coiso.pt', likes: 1 },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('blog has id property', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('can post new valid blog', async () => {
  const dummyBlog = { author: 'dummyAuthor', title: 'dummyTitle', url: 'dummyUrl.com', likes: 3 }
  await api
    .post('/api/blogs')
    .send(dummyBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const response = await api.get('/api/blogs')

  const authors = response.body.map((r) => r.author)
  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(authors).toContain('dummyAuthor')
})

test('likes property defaults to zero', async () => {
  const newBlog = { author: 'me', title: 'my title', url: 'my_url.com' }
  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBe(0)
})

test('new blog without title or url must return code 400', async () => {
  const newBlog = { author: 'me' }
  await api.post('/api/blogs').send(newBlog).expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})
