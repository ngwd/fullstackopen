import { useEffect } from 'react'
import { useAppContext } from './components/AppContext'

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'

const App = () => {
  const { setBlogs, user, setUser, needRefresh, setNeedRefresh } = useAppContext()

  useEffect(() => {
    blogService.getAll().then(data => {
      setBlogs( data )
      if (needRefresh) {
        setNeedRefresh(false)
      }
    })
  }, [user, needRefresh])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJson) {
      const userLogin = JSON.parse(loggedUserJson)
      setUser(userLogin)
    }
  }, [])

  return (
    <div>
      {user===null ? <LoginForm /> : <BlogForm />}
    </div>
  )
}

export default App