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
  // <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
  if (userBlogs) {
    return (
      <>
        <h3>users</h3>
        <table>
          <thead><tr><th></th><th>blogs created</th></tr></thead>
          <tbody>
            {Object.entries(userBlogs).map(([key, value]) => (
              <tr key = {key}>
                <td> {value[0].user?.name??''} </td><td>{value.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )
  }
  else {
    return null
  }

}
export default UserView