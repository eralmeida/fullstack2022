import { useQuery } from '@apollo/client'
import { useState } from 'react'

import { ALL_BOOKS } from '../queries'

const Books = () => {
  const booksResult = useQuery(ALL_BOOKS)
  const [filter, setFilter] = useState('')
  if (booksResult.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>

      {filter ? (
        <p>
          in genre <b>{filter}</b>
        </p>
      ) : null}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksResult.data.allBooks
            .filter((book) => (filter ? book.genres.includes(filter) : book))
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>

      {booksResult.data.allBooks
        .map((a) => a.genres)
        .reduce((a, b) => a.concat(b), [])
        .filter((elem, index, array) => array.indexOf(elem) === index)
        .map((genre) => (
          <button key={genre} value={genre} onClick={({ target }) => setFilter(target.value)}>
            {genre}
          </button>
        ))}

      <button value="allGenres" onClick={() => setFilter('')}>
        All Genres
      </button>
    </div>
  )
}

export default Books
