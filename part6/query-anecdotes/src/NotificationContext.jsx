import { useEffect } from 'react'
import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  console.log('action ', action)
  switch(action.type) {
    case 'SET':
      state = action.payload 
      return state 
    case 'RESET':
      state = '' 
      return state
    default:
      return state 
  }
}

const NotificationContext = createContext()

export const useNotification = () => {
  const notificationAndDispatcher = useContext(NotificationContext)
  return notificationAndDispatcher[0]
}
export const useNotificationDispatch = () => {
  const notificationAndDispatcher = useContext(NotificationContext)
  return notificationAndDispatcher[1]
}

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  useEffect(() => {
    let timeOutId
    if (notification) {
      timeOutId = setTimeout(()=> {
        notificationDispatch({ type: 'RESET' })
      }, 5_000)
    }
    return () => {
      clearTimeout(timeOutId)
    }
  }, [notification])

  return (
    <NotificationContext.Provider value = {[ notification, notificationDispatch ]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext