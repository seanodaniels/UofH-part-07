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
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => {
            const numBloglistings = u.blogs.length
            return (
              <tr key={u.username}>
                <td>
                  <Link to={`/users/${u.id}`}>{u.username}</Link>
                </td>
                <td>{numBloglistings}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
export default UserListing
