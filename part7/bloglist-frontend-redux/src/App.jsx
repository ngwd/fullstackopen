import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { syncBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/loginReducer'
import LoginForm from './components/LoginForm'
import BigBlogForm from './components/BigBlogForm'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(
    state => state.loginReducer
  )

  useEffect(() => {
    dispatch(syncBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
    }
  }, [])

  return (
    <div>
      {!user ? (
        <LoginForm />
      ) : 
        <BigBlogForm /> 
      }
    </div>
  )
}

export default App