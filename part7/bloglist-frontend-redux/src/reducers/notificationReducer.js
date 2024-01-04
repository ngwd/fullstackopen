import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      console.log('action pl', action.payload)
      state = { ...action.payload }
      return state
    },
    resetNotification(state, action) {
      state = null
      return state
    }
  }
})
export const { setNotification, resetNotification } = notificationSlice.actions
export const setTimeoutNotification = (content, level, milli_sec) => {
  return dispatch => {
    dispatch(setNotification({content, level}))
    console.log('setTimeoutNotification 1')
    setTimeout(() => dispatch(resetNotification()), milli_sec)
  }
}
export default notificationSlice.reducer