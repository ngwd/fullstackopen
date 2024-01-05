import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = () => {
  const dispatch = useDispatch()
  const initialNewBlog = {
    title: '',
    author: '',
    url: ''
  }
  const [newBlog, setNewBlog] = useState(initialNewBlog)

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewBlog(prevBlogState => ({
      ...prevBlogState,
      [name]: value,
    }))
  }

  const addNew = () => {
    const blog = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    }
    dispatch(createBlog(blog))
    setNewBlog(initialNewBlog)
    blogFormRef.current.toggleVisibility()
  }

  return (
    <div className='formDiv'>
      <h2>create new</h2>
      <p>title:  <input value={newBlog.title} name='title' onChange={handleChange} id='title-input' /></p>
      <p>author: <input value={newBlog.author} name='author' onChange={handleChange} id='author-input' /></p>
      <p>url: <input value={newBlog.url} name='url' onChange={handleChange} id='url-input' /></p>
      <button onClick={addNew} id='new-button'>create</button>
    </div>
  )
}
export default BlogForm