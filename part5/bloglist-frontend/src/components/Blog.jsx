import { useState } from 'react'
import blogService from '../services/blogs'

const RestOfBlog = ({ blog, user, collapse, setError, setNeedRefresh }) => {
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

  const showRemoveButton = (blog) => {
    const blogAdderId = blog.user?.id.toString()??''
    if (blogAdderId !== user.id) {
      return null
    }
    return (<button onClick={ () => remove(blog) }>remove</button>)
  }
  if (collapse) return null
  return (
    <>
      <p><a href={blog.url}>{blog.url}</a></p>
      <p>like {blog.likes||0} <button onClick={() => upVote(blog)}>like</button></p>
      <p>{blog.user?blog.user.name:null}</p>
      {showRemoveButton(blog)}
    </>
  )
}
const Blog = ({ blog, user, setError, setNeedRefresh }) => {
  const [collapse, setCollapse] = useState(true)
  const viewRestOfBlog = () => {
    setCollapse(!collapse)
  }
  return (
    <div className='blog'>
      <p key={blog.title}>{blog.title} <i>by</i> {blog.author} <button onClick={blog => viewRestOfBlog(blog)}>{collapse? 'view' : 'hide'}</button></p>
      <RestOfBlog blog={blog} user={user} collapse={collapse} setError={setError} setNeedRefresh={setNeedRefresh} />
    </div>
  )
}
export default Blog