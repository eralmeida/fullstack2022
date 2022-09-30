import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/loginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/togglable'
import BlogForm from './components/blogForm'
import React from 'react'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    loadBlogsSorted()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loadBlogsSorted = () => {
    blogService
      .getAll()
      .then((blogs) => blogs.sort((a, b) => b.likes - a.likes))
      .then((blogs) => setBlogs(blogs))
  }

  const loginForm = () => {
    return (
      <Togglable viewLabel="login" hideLabel="Cancel">
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        ></LoginForm>
      </Togglable>
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
    } catch (exception) {
      setTimedMessage(setErrorMessage, 'Wrong Credentials')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const showBlogRemovalButtonHandler = (blogObject) => {
    return blogObject.user.username === user.username
  }

  const addBlog = (blogObject) => {
    blogService.create(blogObject).then((savedBlog) => {
      setBlogs(blogs.concat(savedBlog))
      setTimedMessage(setMessage, `A new blog ${savedBlog.title} by ${savedBlog.author} added`)
    })
  }

  const likeHandler = (blogObject) => {
    const newBlogObject = { ...blogObject, likes: blogObject.likes + 1 }
    blogService.update(blogObject.id, newBlogObject).then((updatedBlog) => setBlogs(blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))))
  }

  const removeHandler = (blogObject) => {
    if (window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)) {
      blogService.remove(blogObject.id).then(() => loadBlogsSorted())
    }
  }

  const setTimedMessage = (messageHandler, text) => {
    messageHandler(text)
    setTimeout(() => {
      messageHandler(null)
    }, 5000)
  }

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      <Notification message={message}></Notification>
      <ErrorMessage message={errorMessage}></ErrorMessage>
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable viewLabel="New Blog" hideLabel="Cancel">
        <BlogForm createBlog={addBlog}></BlogForm>
      </Togglable>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} incrementLike={likeHandler} showRemovalButton={showBlogRemovalButtonHandler(blog)} removeBlog={removeHandler} />
      ))}
    </div>
  )

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    return <div className="addedNameMessage">{message}</div>
  }

  const ErrorMessage = ({ message }) => {
    if (message === null) {
      return null
    }
    return <div className="errorMessage">{message}</div>
  }

  return <div>{user === null ? loginForm() : blogList()}</div>
}

export default App
