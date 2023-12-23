export const filter = (condition) => {
  return {
    type: 'FILTER',
    payload: {
      condition
    }
  }
}

const filterReducer = (state = {condition: ''}, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
    case 'FILTER':
      {
        const condition = action.payload.condition
        return {
          condition
        }
      }
  }
  return state
}
export default filterReducer