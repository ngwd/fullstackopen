import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { userAggregate } from '../reducers/userBlogsReducer'
const UserView = ({id}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userAggregate())
  }, [dispatch])

  const userBlogs = useSelector(
    state => state.userBlogsReducer
  )
  if (!userBlogs) {
    return null
  }
  if (!id) {
    return (
      <>
        <h2>users</h2>
        <table>
          <thead><tr><th></th><th>blogs created</th></tr></thead>
          <tbody>
            {Object.entries(userBlogs).map(([key, value]) => (
              <tr key = {key}>
                <td><Link to={`/users/${key}`}>{value[0].user?.name??''}</Link></td>
                <td>{value.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )
  }
  else {
    const blogs = userBlogs[id]
    if (!blogs) return null 
    const userName = blogs[0].user.name
    return (
      <>
        <h2>{userName}</h2>
        <h3>added blogs</h3>
        <ul>
          {
            blogs.map(blog => (
              <li key = {blog.id}> {blog.title} </li>
            ))
          }
        </ul>
      </>
    ) 
  }

}
export default UserView