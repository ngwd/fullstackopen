import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs' 

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    }
  }
})
export const {setBlogs, appendBlog} = blogSlice.actions

export const syncBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}
export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.addNew(blog)
    dispatch(appendBlog(blog))
  }
}
export default blogSlice.reducer