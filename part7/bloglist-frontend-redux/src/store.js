import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
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