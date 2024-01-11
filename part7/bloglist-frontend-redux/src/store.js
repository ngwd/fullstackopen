import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import userBlogsReducer from './reducers/userBlogsReducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    loginReducer,
    blogReducer,
    userBlogsReducer,
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