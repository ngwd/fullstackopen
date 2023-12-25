import { createSlice } from '@reduxjs/toolkit'
import { vote } from './anecdoteReducer'

const notificationSlice = createSlice({
  name:"notification",
  initialState:"",
  reducers: {
    vote_notification(state, action) {
      state = `you vote for \'${action.payload}\'`
      return state
    },
    add_notification(state, action) {
      state = `you add \'${action.payload}\'`
      return state
    },
    reset_notification(state, action) {
      state = ''
      return state
    }
  }
})

export const { vote_notification, add_notification, reset_notification } = notificationSlice.actions
export default notificationSlice.reducer