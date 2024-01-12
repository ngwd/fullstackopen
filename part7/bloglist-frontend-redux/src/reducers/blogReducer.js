import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs' 
import { setTimeoutNotification } from './notificationReducer'

const slice = createSlice({
  name: 'blogs',
  initialState: null,
  reducers: {
    setBlogs(state, { payload }) {
      return payload
    },
    replace(state, { payload }) {
      return state
              .map(b => b.id === payload.id ? payload: b)
              .sort((a,b) => b.likes - a. likes)
    },
    remove(state, { payload }) {
      return state.filter(cur => cur.id !== payload)
    },
    append(state, { payload }) {
      state.push(payload)
    }
  }
})
export const { setBlogs, append, remove, replace } = slice.actions

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
  }
}
export const addNewComment = (blog, comment)  => {

  return async dispatch => {
    const newObj = await blogService.addNewComment(blog.id, comment)
    console.log("newObj ", newObj)
    dispatch(replace(newObj))
  }
}
export const removeBlog = blog => {
  return async dispatch => {
    const res = await blogService.removeBlog(blog)
    dispatch(remove(blog.id))
    dispatch(setTimeoutNotification(`${blog.title} is removed`, 0, 4000))
    dispatch(syncBlogs())
  }
}
export default slice.reducer