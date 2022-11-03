import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    add(_state, action) {
      const notification = action.payload
      return notification
    },
    remove(_state, _action) {
      return null
    },
  },
})

export const { add, remove } = notificationSlice.actions
export default notificationSlice.reducer
