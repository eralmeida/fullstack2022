import { useApolloClient } from '@apollo/client'
import { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'

import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'

const App = () => {
  const linkPadding = { padding: 5 }
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  const Notify = ({ errorMessage }) => {
    if (!errorMessage) {
      return null
    }
    return <div style={{ color: 'red' }}>{errorMessage}</div>
  }

  if (!token) {
    return (
      <>
        <Notify errorMessage={errorMessage} />
        <LoginForm setToken={setToken} setError={notify} />
      </>
    )
  }

  return (
    <div>
      <div>
        <Link style={linkPadding} to="/">
          authors
        </Link>
        <Link style={linkPadding} to="/books">
          books
        </Link>
        {token === null ? (
          <Link style={linkPadding} to="/login">
            login
          </Link>
        ) : (
          <>
            <Link style={linkPadding} to="/add">
              add
            </Link>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>
      <Notify errorMessage={errorMessage} />
      <Routes>
        <Route path="/" element={<Authors setError={notify} />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook setError={notify} />} />
        <Route path="/login" element={<LoginForm setToken={setToken} setError={notify}></LoginForm>} />
      </Routes>
    </div>
  )
}

export default App
