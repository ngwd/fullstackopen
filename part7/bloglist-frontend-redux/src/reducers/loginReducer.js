import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setTimeoutNotification } from './notificationReducer'

const loginSlice = createSlice({
  name:'login',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    }
  }
})

export const { setUser } = loginSlice.actions
// export const loginUser = (state) => state.login.user;

export const login = (usrpwd) => {
  return async dispatch => {
    try {
      const user = await loginService.login(usrpwd)
      console.log('handleLogin: user ', user)

      dispatch(setUser(user))
      dispatch(setTimeoutNotification(`${user.name} logged in`, 0, 4000))

      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    }
    catch (exception) {
      dispatch(setTimeoutNotification('invalid password or user name', 1, 4000))
    }
  }
}
export const logout = () => {
  return async dispatch => {
    dispatch(setUser(null))
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogAppUser')
  }
}

export default loginSlice.reducer
