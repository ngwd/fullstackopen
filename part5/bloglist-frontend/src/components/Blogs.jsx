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

  const blogsSect = blogs.sort((a, b)=>a.likes<b.likes?1:-1).map(blog =>(
    <Blog key={blog.id} blog={blog} user={user} />
  ))

  return ( 
    <>
      {blogsSect}
    </>
  )
}
export default Blogs