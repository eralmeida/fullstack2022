import React from 'react'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch({ type: 'anecdotes/create', payload: content })
    dispatch({ type: 'notifications/add', payload: `You added '${content}'` })
    setTimeout(() => {
      dispatch({ type: 'notifications/remove' })
    }, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  )
}

export default AnecdoteForm
