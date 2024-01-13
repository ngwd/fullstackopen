import { createContext, useReducer, useContext } from 'react'

const reducer = (state, action) => {
  switch(action.type) {
    case 'SET':
      return action.payload
    case 'RESET':
      return ''
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = ({children}) => {
  const [notification, dispatch] = useReducer(reducer, '')
  return (
    <NotificationContext.Provider value={[ notification, dispatch ]}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const [value]= useContext(NotificationContext)
  return value 
}

export const useNotifier = () => {
  const [, dispatch]= useContext(NotificationContext)
  return (payload) => {
    dispatch({ type:'SET', payload })
    setTimeout(()=> {
      dispatch({ type:'RESET'})
    }, 4_000)
  }
}

export default NotificationContext