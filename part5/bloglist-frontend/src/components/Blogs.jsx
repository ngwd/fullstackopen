import { useEffect } from 'react'
import blogService from '../services/blogs'
import Blog from './Blog'
const Blogs = ({user, blogs, setBlogs, needRefresh, setNeedRefresh}) => {
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const res = await blogService.findBlogsByUserId(user.id)
        setBlogs(res);
      } catch (error) {
        console.log(error);
      }
    }
    if (user || needRefresh) {
      fetchData()
      setNeedRefresh(false)
    }
  }, [user, needRefresh])

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