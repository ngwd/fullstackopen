import { useState } from 'react'

const RestOfBlog = ({blog, collapse})=>{
  if (collapse) return null
  return (
    <>
      <p>{blog.url}</p> 
      <p>like {blog.likes||0} <button onClick={blog=>upVote(blog.id)}>like</button></p>
      <p>{blog.user}</p>
    </>
  )
}
const Blog = ({blog})=>{
  console.log("Blog", blog)
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