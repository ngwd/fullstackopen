import { useState } from "react"
import blogService from '../services/blogs'

const NewBlog = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const handleTitleChange = (e) => {
    const s = e.target.value;
    setTitle(s)
  }
  const handleAuthorChange = (e) => {
    const s = e.target.value;
    setAuthor(s)
  }
  const handleUrlChange = (e) => {
    const s = e.target.value;
    setUrl(s)
  }
  const addNew = (e)=> {
    const res = blogService.addNew({title, author, url})
    if (res) {
      setUrl('')
      setAuthor('')
      setTitle('')
    }
    else {

    }
  }
  return (
    <>
      <h2>create new</h2>
      <p>title:  <input value={title} onChange={handleTitleChange}/></p>
      <p>author: <input value={author} onChange={handleAuthorChange} /></p>
      <p>url: <input value={url} onChange={handleUrlChange} /></p>
      <button onClick={addNew}>create</button>
    </>
  ) 
}
export default NewBlog