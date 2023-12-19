const BlogForm = ({newBlog, handleNewBlogUpdate, addNew }) => {

  const handleChange = (e) => {
    const { name, value } = e.target 
    handleNewBlogUpdate(prevBlogState => ({
      ...prevBlogState,
      [name]: value,
    }))
  }

  return (
    <div className='formDiv'>
      <h2>create new</h2>
      <p>title:  <input value={newBlog.title} name='title' onChange={handleChange}/></p>
      <p>author: <input value={newBlog.author} name='author' onChange={handleChange} /></p>
      <p>url: <input value={newBlog.url} name='url' onChange={handleChange} /></p>
      <button onClick={addNew}>create</button>
    </div>
  )
}
export default BlogForm