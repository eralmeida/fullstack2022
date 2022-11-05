import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    create(state, action) {
      state.push(action.payload)
    },
    incrementVote(state, action) {
      const changedAnecdote = action.payload
      return state.map((anecdote) => (anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote))
    },
    setAnecdotes(_state, action) {
      return action.payload
    },
  },
})

export const { create, incrementVote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(create(newAnecdote))
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    const updatedAnecdote = await anecdoteService.update(votedAnecdote)
    dispatch(incrementVote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer
