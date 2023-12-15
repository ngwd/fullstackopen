import { useState } from 'react'

const RestOfBlog = ({blog, collapse})=>{
  if (collapse) return null
  return (
    <>
      <p key={blog.url}>{blog.url}</p> 
      <p key={blog.like}>like {blog.like||0} <button onClick={blog=>upVote(blog.id)}>like</button></p>
    </>
  )
}
const Blog = ({blog})=>{
  const [collapse, setCollapse] = useState(true)
 
  const viewRestOfBlog = () => {
    setCollapse(!collapse)
  }
  return (
    <div className='blog'>
      <p key={blog.title}>{blog.title} <i>by</i> {blog.author} <button onClick={blog=>viewRestOfBlog(blog)}>{collapse? 'view' : 'hide'}</button></p>
      <RestOfBlog blog={blog} collapse={collapse}/>
    </div>
  )
}
export default Blog