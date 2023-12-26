import { createSlice } from '@reduxjs/toolkit'
import { vote } from './anecdoteReducer'

const notificationSlice = createSlice({
  name:"notification",
  initialState:"",
  reducers: {
    setNotification(state, action) {
      state = action.payload
      return state
    },
    resetNotification(state, action) {
      state = ''
      return state
    }
  }
})

export const { setNotification, resetNotification } = notificationSlice.actions
export default notificationSlice.reducer