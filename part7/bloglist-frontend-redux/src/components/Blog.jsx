import { useState } from 'react'

const RestOfBlog = ({ blog, removable, collapse, upVote, remove }) => {

  const buttonVisible = { display: removable ? '' : 'none' }
  if (collapse) return null
  return (
    <>
      <p><a href={blog.url}>{blog.url}</a></p>
      <p>like {blog.likes||0} <button onClick={() => upVote(blog)}>like</button></p>
      <p>{blog.user ? blog.user.name : null}</p>
      <button style={buttonVisible} onClick={ () => remove(blog) }>remove</button>
    </>
  )
}
const Blog = ({ blog, removable, upVote, remove }) => {
  const [collapse, setCollapse] = useState(true)
  const viewRestOfBlog = () => {
    setCollapse(!collapse)
  }
  return (
    <div className='blog'>
      <p key={blog.title}>{blog.title} <i>by</i> {blog.author} <button onClick={blog => viewRestOfBlog(blog)}>{collapse? 'view' : 'hide'}</button></p>
      <RestOfBlog blog={blog} removable={removable} collapse={collapse} upVote={upVote} remove={remove}/>
    </div>
  )
}
export default Blog