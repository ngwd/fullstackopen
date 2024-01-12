import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { syncBlogs } from './reducers/blogReducer'
import { setUser, logout } from './reducers/loginReducer'
import LoginForm from './components/LoginForm'
import BigBlogForm from './components/BigBlogForm'
import BigUserView from './components/BigUserView'
import { Navbar, Nav } from 'react-bootstrap'
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

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <div className="container">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/blogs">blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">users</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {user
                ? <em style={padding}>{user.name} logged in <button onClick={handleLogout}>logout</button></em>
                : <Link style={padding} to="/login">login</Link>
              }
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes>
        <Route path='/login' element={ !user? <LoginForm/> : <BigBlogForm/> } />
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