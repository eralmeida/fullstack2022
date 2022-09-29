import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      console.log(user)
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleBlogCreate = async (event) => {
    event.preventDefault()

    try {
      const savedBlog = await blogService.create({ title: title, author: author, url: url })
      setBlogs(blogs.concat(savedBlog))
      setMessage(`A new blog ${savedBlog.title} by ${savedBlog.author} added`)
    } catch (exception) {
      setErrorMessage(`Something is wrong  ${exception}`)
    }
  }

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => (
    <>
      <h2>log in to application</h2>
      <ErrorMessage message={errorMessage}></ErrorMessage>
      <form onSubmit={handleLogin}>
        <div>
          username <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)}></input>
        </div>
        <div>
          password <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)}></input>
        </div>
        <div>
          <button type="submit">login</button>
        </div>
      </form>
    </>
  )

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      <Notification message={message}></Notification>
      <ErrorMessage message={errorMessage}></ErrorMessage>
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <h2>Create new Blog</h2>
      <form style={{ marginBottom: 10 }} onSubmit={handleBlogCreate}>
        <div>
          Title: <input type="text" value={title} name="Title" onChange={({ target }) => setTitle(target.value)}></input>
        </div>
        <div>
          Author: <input type="text" value={author} name="Author" onChange={({ target }) => setAuthor(target.value)}></input>
        </div>
        <div>
          Url: <input type="text" value={url} name="URL" onChange={({ target }) => setUrl(target.value)}></input>
        </div>
        <div>
          <button type="submit">Create Blog</button>
        </div>
      </form>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
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
