import blogService from '../services/blogs'
const Blogs = ({user, blogs, updateBlogs}) => {
  blogService
    .findBlogsByUserId(user.id)
    .then( res => {
      console.log('res', res)
      updateBlogs(res)
    })
    .catch(error=>{
      console.log(error);
      // updateBlogs(null);
    })

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