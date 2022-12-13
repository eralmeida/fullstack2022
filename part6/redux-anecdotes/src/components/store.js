import anecdoteReducer from '../reducers/anecdoteReducer'
import notificationReducer from '../reducers/notificationReducer'
import filterReducer from '../reducers/filterReducer'
import { configureStore } from '@reduxjs/toolkit'
import { useReducer } from 'react'

const Store = configureStore({ reducer: { anecdotes: anecdoteReducer, notifications: notificationReducer, filter: filterReducer, user: useReducer } })

export default Store
