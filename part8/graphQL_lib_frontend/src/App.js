import Authors from './components/Authors'
import NewBook from './components/NewBook'
import { Link, Routes, Route } from 'react-router-dom'
import Books from './components/Books'
import { useState } from 'react'

const App = () => {
  const linkPadding = { padding: 5 }
  const [errorMessage, setErrorMessage] = useState(null)

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

  return (
    <div>
      <div>
        <Link style={linkPadding} to="/">
          authors
        </Link>
        <Link style={linkPadding} to="/books">
          books
        </Link>
        <Link style={linkPadding} to="/add">
          add
        </Link>
      </div>
      <Notify errorMessage={errorMessage} />
      <Routes>
        <Route path="/" element={<Authors setError={notify} />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook setError={notify} />} />
      </Routes>
    </div>
  )
}

export default App
