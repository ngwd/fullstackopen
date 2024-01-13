import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { syncBlogs } from './reducers/blogReducer'
import { setUser, logout } from './reducers/loginReducer'
import LoginForm from './components/LoginForm'
import BigBlogForm from './components/BigBlogForm'
import BigUserView from './components/BigUserView'
import Blog from './components/BigBlogForm'
import { Navigation, Page, SmallButton } from './components/styled'
import {
  Routes, Route, Link, useNavigate
} from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
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

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <Page>
      <Navigation>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        {user ? 
          <span style={padding}>{user.name} logged in <SmallButton onClick={handleLogout}>logout</SmallButton></span>
            : <Link style={padding} to="/login">login</Link>}
      </Navigation>
      <Routes>
        <Route path='/login' element={ !user? <LoginForm/> : <BigBlogForm/> } />
        <Route path='/' element={ !user? <LoginForm/> : <BigBlogForm/> } />
        <Route path='/users' element={ <BigUserView /> } />
        <Route path='/users/:id' element={ <BigUserView /> } />
        <Route path='/blogs' element={ <BigBlogForm /> } />
        <Route path='/blogs/:id' element={ <Blog /> } />
      </Routes>
    </Page>
  )
}

export default App