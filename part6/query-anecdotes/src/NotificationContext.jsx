import { createContext, useReducer, useContext } from 'react'
const reducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload
    case "RESET":
      return null
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, dispatch] = useReducer(reducer, '')
  return (
    <NotificationContext.Provider value = {[ notification, dispatch ]}>
      {props.children}
    </NotificationContext.Provider>
  )
}
export const useNotification = () => {
  const notificationAndDispatcher = useContext(NotificationContext)
  return notificationAndDispatcher[0]
}
export const useNotify = () => {
  const notificationAndDispatcher = useContext(NotificationContext)
  const dispatch = notificationAndDispatcher[1]
  return (payload) => {
    dispatch({ type: 'SET', payload })
    setTimeout(() => {
      dispatch({ type: 'RESET' })
    }, 5_000)
  }
}

export default NotificationContext