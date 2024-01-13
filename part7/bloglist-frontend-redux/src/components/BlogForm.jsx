import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { useNavigate } from 'react-router-dom'
import { SmallButton, Input, GridOneColumn } from './styled'

const BlogForm = ({ hideMe }) => {
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

  const navigate = useNavigate()
  const addNew = (e) => {
    const blog = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    }
    dispatch(createBlog(blog))
    setNewBlog(initialNewBlog)
    navigate('/blogs')

    // blogFormRef.current.toggleVisibility()
    hideMe()
  }

  return (
    <div className='formDiv'>
      <form onSubmit={addNew}>
        <h2>create new</h2>
        <GridOneColumn>
          <div>
            <Input placeholder='title' value={newBlog.title} name='title' onChange={handleChange} id='title-input' />
          </div>
          <div>
            <Input placeholder='author' value={newBlog.author} name='author' onChange={handleChange} id='author-input' />
          </div>
          <div>
            <Input placeholder='url' value={newBlog.url} name='url' onChange={handleChange} id='url-input' />
          </div>
        </GridOneColumn>
        <SmallButton style={{ marginBottom: 10 }} type="submit" id='new-button'>create</SmallButton>
      </form>

    </div>
  )
}
export default BlogForm