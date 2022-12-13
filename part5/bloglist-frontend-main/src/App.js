import './index.css'

import { useEffect, useState } from 'react'
import React from 'react'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Route, Routes } from 'react-router-dom'

import BlogDetails from './components/BlogDetails'
import BlogForm from './components/blogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/loginForm'
import Notification from './components/Notification'
import Togglable from './components/togglable'
import User from './components/User'
import Users from './components/Users'
import { createBlog, initializeBlogs } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { setUser } from './reducers/userReducer'
import blogService from './services/blogService'
import loginService from './services/login'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loggedInUser = useSelector(({ user }) => user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    if (loggedInUser) {
      blogService.setToken(loggedInUser.token)
    }
  }, [loggedInUser])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedUser = await loginService.login({ username, password })
      dispatch(setUser(loggedUser))
      setUsername('')
      setPassword('')
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(loggedUser))
      blogService.setToken(loggedUser.token)
    } catch (exception) {
      dispatch(setNotification('Wrong Credentials', 5))
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(null))
  }

  const addBlog = (blogObject) => {
    blogFormRef.current()
    dispatch(createBlog(blogObject))
    dispatch(setNotification(`A new blog ${blogObject.title} by ${blogObject.author} added`, 5))
  }

  const LoggedUser = () => {
    if (!loggedInUser) {
      return null
    }
    return (
      <p>
        {loggedInUser.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
    )
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel="login">
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

  const blogFormRef = useRef()

  const blogForm = () => {
    return (
      <div>
        <Togglable buttonLabel="New Blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog}></BlogForm>
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <div className="navBar">
        <Link className="navLink" to="/">
          blogs
        </Link>
        <Link className="navLink" to="/users">
          users
        </Link>
        <LoggedUser></LoggedUser>
      </div>
      <h2>blogs</h2>
      <Notification></Notification>

      {loggedInUser === null ? loginForm() : blogForm()}

      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/" element={<BlogList />} />
      </Routes>
    </div>
  )
}

export default App
