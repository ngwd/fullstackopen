import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useNotify } from '../NotificationContext'
import blogService from '../services/blogs'

const BlogForm = () => {

  const queryClient = useQueryClient()
  const notifyWith = useNotify()

  const newBlogMutation = useMutation({
    mutationFn: blogService.addNew,
    onSuccess: (data)=> {
      queryClient.invalidateQueries({queryKey: ['blogs']})
      notifyWith(`a new blog: ${data.title} by ${data.author} added`)
    },
    onError: (error) => {
      notifyWith('fail to add new blog')
    }
  })

  const onCreate = (e) => {
    e.preventDefault()
    console.log('addNew clicked')
    newBlogMutation.mutate({ 
      title: e.target.title.value, 
      author: e.target.author.value, 
      url: e.target.url.value
    })
    e.target.title.value = ''
    e.target.author.value = ''
    e.target.url.value = ''
    // blogFormRef.current.toggleVisibility()
  }

  /*
  const handleChange = (e) => {
    const { name, value } = e.target
    handleNewBlogUpdate(prevBlogState => ({
      ...prevBlogState,
      [name]: value,
    }))
  }
  */

  return (
    <form onSubmit = {onCreate} className='formDiv'>
      <h2>create new</h2>
      <p>title:  <input name='title' id='title-input' /></p>
      <p>author: <input name='author' id='author-input' /></p>
      <p>url: <input name='url' id='url-input' /></p>
      <button type='submit' id='new-button'>create</button>
    </form>
  )
}
export default BlogForm