import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setTimeoutNotification } from './notificationReducer'

const userBlogsSlice = createSlice({
  name: 'userBlogs',
  initialState: null,
  reducers: {
    setUserBlogs(state, action) {
      return action.payload
    }
  }
})

export const { setUserBlogs } = userBlogsSlice.actions

export const userAggregate = () => {
  return async dispatch => {
    try {
      const data = await blogService.aggregateOnUser()
      dispatch(setUserBlogs(data))
    }
    catch(error) {
      dispatch(setTimeoutNotification(`user aggregation data fetching error ${error}`))
    }
  }
}
export default userBlogsSlice.reducer