import { useState } from 'react'
import blogService from '../services/blogs' 

const RestOfBlog = ({blog, user, collapse})=>{
  const remove = (blog) => {
    return 0
  }
  const upVote = (blog) => {
    return 0
  }
  if (collapse) return null
  return (
    <>
      <p><a href={blog.url}>{blog.url}</a></p> 
      <p>like {blog.likes||0} <button onClick={blog=>upVote(blog.id)}>like</button></p>
      <p>{user.name}</p>
      <button onClick={{remove}}>remove</button>
    </>
  )
}
const Blog = ({blog, user})=>{
  const blogStyle = {
    paddingTop: 1,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 1
  }
  const [collapse, setCollapse] = useState(true)
 
  const viewRestOfBlog = () => {
    setCollapse(!collapse)
  }
  return (
    <div style={blogStyle}>
      <p key={blog.title}>{blog.title} <i>by</i> {blog.author} <button onClick={blog=>viewRestOfBlog(blog)}>{collapse? 'view' : 'hide'}</button></p>
      <RestOfBlog blog={blog} user={user} collapse={collapse}/>
    </div>
  )
}
export default Blog