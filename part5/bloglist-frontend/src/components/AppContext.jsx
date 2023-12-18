import { useState, createContext, useContext} from 'react'
const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [needRefresh, setNeedRefresh] = useState(false)
  return (
    <AppContext.Provider value = {{
      blogs, setBlogs, 
      user, setUser, 
      error, setError, 
      needRefresh, setNeedRefresh
    }}>
      {children}
    </AppContext.Provider>
  )
}
export const useAppContext = () => {
  return useContext(AppContext)
}