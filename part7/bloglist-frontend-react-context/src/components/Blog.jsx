import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useNotifier } from '../NotificationContext'
import blogService from '../services/blogs'
import { useState } from 'react'

const RestOfBlog = ({ blog, removable, collapse }) => {
  const queryClient = useQueryClient()
  const notifyWith = useNotifier()

  const replaceBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['blogs']})
    },
    onError: (error) => {
      notifyWith(error)
    }
  })
  const removeBlogMutation = useMutation({
    mutationFn: (blog)=>blogService.removeBlog(blog),
    onSuccess: (data, variable) => {
      queryClient.invalidateQueries({queryKey: ['blogs']})
      notifyWith(`${variable.title} is removed`)
    },
    onError: (error) => {
      notifyWith('you are not authorized')
    }
  })

  const upVote = (blog) => {
    const newBlog = {...blog, likes:blog.likes+1} 
    replaceBlogMutation.mutate(newBlog)
  } 

  const remove = (blog) => {
    removeBlogMutation.mutate(blog)
  }
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
const Blog = ({ blog, removable }) => {
  const [collapse, setCollapse] = useState(true)
  const viewRestOfBlog = () => {
    setCollapse(!collapse)
  }
  return (
    <div className='blog'>
      <p key={blog.title}>{blog.title} <i>by</i> {blog.author} <button onClick={blog => viewRestOfBlog(blog)}>{collapse? 'view' : 'hide'}</button></p>
      <RestOfBlog blog={blog} removable={removable} collapse={collapse} />
    </div>
  )
}
export default Blog