import { useEffect } from 'react'
import blogService from '../services/blogs'
let token = null
const setToken = (newToken)=>{
  token=`Bearer ${newToken}`
}
const Blogs = ({user, blogs, updateBlogs}) => {
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const res = await blogService.findBlogsByUserId(user.id)
        updateBlogs(res);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  }, [user])

  const blogsSect = blogs.map(blog =>(
    <p key={blog.id}>{blog.title} {blog.author}</p>
  ))
  return ( 
    <>
      {blogsSect}
    </>
  )
}
export default Blogs