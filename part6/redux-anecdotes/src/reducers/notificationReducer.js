import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name:"notification",
  initialState:"",
  reducers: {
    textify(state, action) {
      state = action.payload
      return state
    }
  }
})

export const { textify } = notificationSlice.actions
export default notificationSlice.reducer