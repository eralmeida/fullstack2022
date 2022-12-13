import { createSlice } from '@reduxjs/toolkit'

const initialState = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    set(_state, action) {
      const user = action.payload
      return user
    },
  },
})

export const setUser = (user) => {
  return (dispatch) => {
    dispatch(set(user))
  }
}

export const { set } = userSlice.actions
export default userSlice.reducer
