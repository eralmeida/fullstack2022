import { createSlice } from '@reduxjs/toolkit'

import userService from '../services/userService'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(_state, action) {
      return action.payload
    },
  },
})

export const { setUsers } = usersSlice.actions

export const getAllUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch(setUsers(users))
  }
}

export default usersSlice.reducer
