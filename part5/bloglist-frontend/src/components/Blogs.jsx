import { useEffect } from 'react'
import blogService from '../services/blogs'
import Blog from './Blog'
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
    <Blog key={blog.id} blog={blog} />
  ))

  return ( 
    <>
      {blogsSect}
    </>
  )
}
export default Blogs