import { useEffect } from 'react'
import blogService from '../services/blogs'
const Blogs = ({user, blogs, setBlogs}) => {
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const res = await blogService.findBlogsByUserId(user.id)
        setBlogs(res);
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