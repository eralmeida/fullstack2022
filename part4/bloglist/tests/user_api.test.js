const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/User')
const api = supertest(app)
const helper = require('../utils/test_helper')
const bcrypt = require('bcrypt')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash, name: 'eduardo' })

    await user.save()
  })

  test('creation succeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = { name: 'Eduardo', username: 'antraxmiope', password: 'abcd.123' }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

test('cannot create user without username', async () => {
  const newUser = { name: 'Eduardo', password: '12334' }
  await api.post('/api/users').send(newUser).expect(400)
})

test('cannot create user with short username', async () => {
  const newUser = { name: 'Eduardo', username: 'ed', password: '1234' }
  await api.post('/api/users').send(newUser).expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})
