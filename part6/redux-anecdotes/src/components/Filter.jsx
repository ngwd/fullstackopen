import { useDispatch } from 'react-redux'
import { filter } from '../reducers/filterReducer'
const Filter = () => {
  const dispatch = useDispatch()
  const handleChange = (e) => {
    const filterStr = e.target.value
    dispatch(filter(filterStr))
  }
  const style = {
    marginBottom: 10
  }
  return (
    <div style={style}>
      filter < input onChange={handleChange}/>
    </div>
  )
}
export default Filter