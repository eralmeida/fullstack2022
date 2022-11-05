import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification(_state, action) {
      const notification = action.payload
      return notification
    },
    removeNotification(_state, _action) {
      return null
    },
  },
})

export const setNotification = (content, timeInSeconds) => {
  return (dispatch) => {
    dispatch(addNotification(content))
    setTimeout(() => {
      dispatch(removeNotification())
    }, timeInSeconds * 1000)
  }
}

export const { addNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
