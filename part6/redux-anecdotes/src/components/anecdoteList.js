import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  return (
    <div>
      {props.anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() => {
                props.voteAnecdote(anecdote)
                props.setNotification(`You voted for '${anecdote.content}'`, 5)
              }}
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: [...state.anecdotes]
      .sort((a, b) => b.votes - a.votes)
      .filter((a) => {
        if (state.filter) {
          return a.content.includes(state.filter)
        } else {
          return a
        }
      }),
  }
}

const mapDispatchProps = {
  voteAnecdote,
  setNotification,
}

const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchProps)(AnecdoteList)

export default ConnectedAnecdotes
