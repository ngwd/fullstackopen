import { useDispatch, useSelector } from 'react-redux'
import { userAggregate } from '../reducers/userBlogsReducer'
import { useEffect } from 'react'
const UserView = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userAggregate())
  }, [dispatch])

  const userBlogs = useSelector(
    state => state.userBlogsReducer
  )

  console.log('userAggregation', userBlogs)
  if (userBlogs) {
    return (
      <>
        <h2>users</h2>
        <thead>
          <tr>
            <th></th><th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(userBlogs).map(([key, value]) => (
            <tr key = { key }> 
              <td>{ key }</td> <td>{ value.length }</td>
            </tr>
          ))}
        </tbody>
      </>
    )
  }
  else {
    return null
  }

}
export default UserView