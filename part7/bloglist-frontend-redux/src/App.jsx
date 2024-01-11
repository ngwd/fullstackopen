import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { syncBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/loginReducer'
import LoginForm from './components/LoginForm'
import BigBlogForm from './components/BigBlogForm'
import BigUserView from './components/BigUserView'
import {
  Routes, Route, Link
} from 'react-router-dom'

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
      dispatch(setUser(user))
    }
  }, [])
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <div>
        <Link style={padding} to='/blogs'>blogs</Link>
        <Link style={padding} to='/users'>uers</Link>
      </div>
      <Routes>
        <Route path='/' element={ !user? <LoginForm/> : <BigBlogForm/> } />
        <Route path='/users' element={ <BigUserView /> } />
        <Route path='/users/:id' element={ <BigUserView /> } />
        <Route path='/blogs' element={ <BigBlogForm /> } />
        <Route path='/blogs/:id' element={ <BigBlogForm /> } />
      </Routes>
    </div>
  )
}

export default App