import { createSlice } from '@reduxjs/toolkit'

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
export const setNotification_ex = (content, milli_sec) => {
  return dispatch => {
    dispatch(setNotification(content))
    setTimeout(()=>dispatch(resetNotification()), milli_sec)
  }
}
export default notificationSlice.reducer