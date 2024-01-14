import { useState, useEffect } from 'react'
import LoginBanner from './components/LoginBanner'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
    }
  }, [])

  return (
    <div>
      {
        user ? null: 
         <>
          <LoginForm />
         </>
      }
      <LoginBanner />
      <Blogs />
    </div>
  )
}

export default App