import { useState } from 'react'
import { useAppContext } from './AppContext'
import blogService from '../services/blogs'

const RestOfBlog = ({ blog, removable, collapse }) => {
  const { setError, setNeedRefresh } = useAppContext()
  const remove = (blog) => {
    blogService
      .removeBlog(blog)
      .then(res => {
        setError({ code:0, message:`${blog.title} is removed` })
        setNeedRefresh(true)
        setTimeout(() => {
          setError(null)
          setNeedRefresh(false)
        }, 4000)
      })
      .catch(exception => {
        setError({ code:4, message:'you is not authorized' })
        setTimeout(() => setError(null), 4000)
      })
    return 0
  } // remove
  const upVote = (blog) => {
    blogService
      .addLikes(blog)
      .then(res => {
        setNeedRefresh(true)
        setTimeout(() => {
          setNeedRefresh(false)
        }, 4000)
      })
      .catch(exception => {
        setError({ code:5, message:exception })
        setTimeout(() => setError(null), 4000)
      })
  } // upVote

  const buttonVisible = { display: removable ? '' : 'none' }
  if (collapse) return null
  return (
    <>
      <p><a href={blog.url}>{blog.url}</a></p>
      <p>like {blog.likes||0} <button onClick={() => upVote(blog)}>like</button></p>
      <p>{blog.user?blog.user.name:null}</p>
      <button style={buttonVisible} onClick={ () => remove(blog) }>remove</button>
    </>
  )
}
const Blog = ({blog, removable }) => {
  const [collapse, setCollapse] = useState(true)
  const viewRestOfBlog = () => {
    setCollapse(!collapse)
  }
  return (
    <div className='blog'>
      <p key={blog.title}>{blog.title} <i>by</i> {blog.author} <button onClick={blog => viewRestOfBlog(blog)}>{collapse? 'view' : 'hide'}</button></p>
      <RestOfBlog blog={blog} removable={removable} collapse={collapse} />
    </div>
  )
}
export default Blog