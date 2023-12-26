import anecReducer, { setAnecdotes } from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'
import { configureStore } from '@reduxjs/toolkit'
// import anecdoteService from './services/anecdotes' 

const store = configureStore({
  reducer: {
    anecReducer,
    filterReducer,
    notificationReducer,
  }
})
/*
anecdoteService.getAll().then(anecdotes => {
  store.dispatch(setAnecdotes(anecdotes))
})
*/
export default store