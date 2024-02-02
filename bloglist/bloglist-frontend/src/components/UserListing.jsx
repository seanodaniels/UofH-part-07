import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserListing = () => {
  const users = useSelector((state) => state.users)

  if (!users) {
    return null
  }

  return (
    <div id="user-listing">
      <h2>Users</h2>
      <table className="user-listing">
        <tr>
          <th>User</th>
          <th>Blogs Created</th>
        </tr>
        {users.map((u) => {
          const numBloglistings = u.blogs.length
          return (
            <tr key={u.username}>
              <td>{u.username}</td>
              <td>{numBloglistings}</td>
            </tr>
          )
        })}
      </table>
    </div>
  )
}
export default UserListing
