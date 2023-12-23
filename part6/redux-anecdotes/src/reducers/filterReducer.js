import { initialState } from "./anecdoteReducer"
export const filter = (condition) => {
  return {
    type: 'FILTER',
    payload: {
      condition
    }
  }
}

const filterReducer = (state = {anecdotes: initialState, condition: ''}, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
    case 'FILTER':
      {
        const condition = action.payload.condition
        return {
          anecdotes: initialState.filter(s => s.content.includes(condition)), 
          condition
        }
      }
  }
  return state
}
export default filterReducer