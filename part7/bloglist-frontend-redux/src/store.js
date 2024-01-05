import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    loginReducer,
    blogReducer,
    notificationReducer,
  },
  /*
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
  */
});

export default store