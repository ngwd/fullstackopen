const BlogForm = ({ newBlog, handleNewBlogUpdate, addNew }) => {

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
      <p>title:  <input value={newBlog.title} name='title' onChange={handleChange} id='title-input' /></p>
      <p>author: <input value={newBlog.author} name='author' onChange={handleChange} id='author-input' /></p>
      <p>url: <input value={newBlog.url} name='url' onChange={handleChange} id='url-input' /></p>
      <button onClick={addNew} id='new-button'>create</button>
    </div>
  )
}
export default BlogForm