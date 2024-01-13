import { createContext, useReducer, useContext } from 'react'
import loginService from './services/login'
import storageService from './services/storage'
const reducer = (state, action) => {
  switch(action.type) {
    case 'SET': 
      return action.payload
    case 'CLEAR':
      return null
    default:
      throw new Error(`unhandled action type: ${action.type}`)
  }
}

const AuthenticationContext = createContext()

export const AuthProvider = (props) => {
  const [user, dispatch] = useReducer(reducer, null)
  return (
    <AuthenticationContext.Provider value = {[ user, dispatch ]}>
      { props.children }
    </AuthenticationContext.Provider>
  )
}

export const useLogin = () => {
  const [, dispatch] = useContext(AuthenticationContext)

  return async (credentials) => {
    const user = await loginService.login(credentials)
    dispatch({
      type: 'SET',
      payload: user
    })
    storageService.saveUser(user)
  }
}

export const useLogout = () => {
  const [, dispatch] = useContext(AuthenticationContext)

  return async () => {
    dispatch({ type: 'CLEAR' })
    storageService.removeUser()
  }
}


export const useUser = () => {
  const [value]= useContext(AuthenticationContext) 
  return value 
}

export const useInitUser = () => {
  const [, dispatch] = useContext(AuthenticationContext)

  return async () => {
    const user = await storageService.loadUser()
    if ( user ) {
      dispatch({
        type: 'SET',
        payload: user
      })
    }
  }
}

export default AuthenticationContext