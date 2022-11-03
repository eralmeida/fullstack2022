import { createSlice } from '@reduxjs/toolkit'

const initialState = null
const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    set(_state, action) {
      return action.payload
    },
  },
})

export const { set } = filterSlice.actions
export default filterSlice.reducer
