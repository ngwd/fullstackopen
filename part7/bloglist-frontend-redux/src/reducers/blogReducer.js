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
    upVote(state, action) {
      const id = action.payload
      const objToChange = state.find(n => n.id = id)
      const changedObj = {...objToChange, likes: objToChange.likes + 1}
      return state
        .map(n => n.id === id ? changedObj : n)
        .sort((a, b) => a.likes > b.likes ? -1 : 1)
    },
    remove(state, action) {
      const id = action.payload
      return state.filter(cur => cur.id !== id)
    },
    append(state, action) {
      state.push(action.payload)
    }
  }
})
export const { setBlogs, append, remove, upVote } = blogSlice.actions

export const syncBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}
export const createBlog = blog => {
  return async dispatch => {
    await blogService.addNew(blog)
    dispatch(append(blog))
    dispatch(setTimeoutNotification(`a new blog: ${blog.title} by ${blog.author} added`, 0, 4000))
    dispatch(syncBlogs())
  }
}
export const upVoteBlog = blog => {
  return async dispatch => {
    await blogService.addLikes(blog)
    dispatch(upVote(blog.id))
    // dispatch(setTimeoutNotification(exception, 1, 4000))
    dispatch(syncBlogs())
  }
}
export const removeBlog = blog => {
  return async dispatch => {
    const res = await blogService.removeBlog(blog)
    console.log('res of removeBlog', res)
    dispatch(setTimeoutNotification(`${blog.title} is removed`, 0, 4000))
    dispatch(remove(blog.id))
    // dispatch(setTimeoutNotification('you are not authorized', 1, 4000))
    dispatch(syncBlogs())
  }
}
export default blogSlice.reducer