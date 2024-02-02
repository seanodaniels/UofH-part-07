import { useSelector, useDispatch } from 'react-redux'
import { useMatch, Link } from 'react-router-dom'
import NeedLogin from './NeedLogin'

const UserDetails = () => {
  const match = useMatch('/users/:id')
  const users = useSelector((state) => state.users)
  const currentUser = useSelector((state) => state.user)

  if (!users) {
    return null
  }

  const selectedUser = match
    ? users.find((u) => u.id === match.params.id)
    : null

  if (currentUser) {
    return (
      <div className="user-info">
        <h2>{selectedUser.username}</h2>
        {selectedUser.blogs.length > 0 ? (
          <h3>Added Bloglists</h3>
        ) : (
          <h3>No bloglists added yet</h3>
        )}
        <ul>
          {selectedUser.blogs.map((b) => {
            return (
              <li key={b.id}>
                <Link to={`/bloglist/${b.id}`}>{b.title}</Link>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default UserDetails
