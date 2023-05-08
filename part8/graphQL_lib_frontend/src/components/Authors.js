import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import Select from 'react-select'
import { useState } from 'react'

const Authors = ({ setError }) => {
  const authorsResult = useQuery(ALL_AUTHORS)
  const [selectedOption, setSelectedOption] = useState(null)
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      const errorMessage = error.graphQLErrors[0].message
      setError(errorMessage)
    },
  })

  const submitBornYear = async (event) => {
    event.preventDefault()
    editAuthor({ variables: { author: selectedOption.value, setBornTo: Number(born) } })
    setBorn('')
  }

  if (authorsResult.loading) {
    return <div>loading...</div>
  }

  const selectList = authorsResult.data.allAuthors.map((author) => ({ value: author.name, label: author.name }))

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authorsResult.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={submitBornYear}>
        <Select defaultValue={selectList[0]} onChange={setSelectedOption} options={selectList}></Select>
        <div>
          born
          <input type="number" value={born} onChange={({ target }) => setBorn(target.value)} />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
