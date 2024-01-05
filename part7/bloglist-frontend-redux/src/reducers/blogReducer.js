import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs' 
import { setTimeoutNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: null,
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    replace(state, action) {
      const blog = action.payload
      return state
              .map(b => b.id === blog.id ? blog : b)
              .sort((a,b) => b.likes - a. likes)
    },
    remove(state, action) {
      const id = action.payload
      return state.filter(cur => cur.id !== id)
      // state = state.filter(cur => cur.id !== id)
    },
    append(state, action) {
      // state.concat(action.payload)
      state.push(action.payload)
    }
  }
})
export const { setBlogs, append, remove, replace} = blogSlice.actions

export const syncBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}
export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.addNew(blog)
    dispatch(append(newBlog))
    dispatch(setTimeoutNotification(`a new blog: ${newBlog.title} by ${newBlog.author} added`, 0, 4000))
    dispatch(syncBlogs())
  }
}
export const upVoteBlog = blog => {
  const toLike = {...blog, likes: blog.likes + 1}
  return async dispatch => {
    await blogService.update(toLike)
    dispatch(replace(toLike))
    // dispatch(setTimeoutNotification(exception, 1, 4000))
  }
}
export const removeBlog = blog => {
  return async dispatch => {
    const res = await blogService.removeBlog(blog)
    dispatch(remove(blog.id))
    // dispatch(setTimeoutNotification('you are not authorized', 1, 4000))
    dispatch(setTimeoutNotification(`${blog.title} is removed`, 0, 4000))
    dispatch(syncBlogs())
  }
}
export default blogSlice.reducer