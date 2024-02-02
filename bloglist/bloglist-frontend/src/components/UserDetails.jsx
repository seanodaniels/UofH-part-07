import { useSelector, useDispatch } from 'react-redux'
import { useMatch, Link } from 'react-router-dom'

const UserDetails = () => {
  const match = useMatch('/users/:id')
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)

  if (!users) {
    return null
  }

  const selectedUser = match
    ? users.find((u) => u.id === match.params.id)
    : null

  return (
    <div className="user-info">
      <h2>{selectedUser.username}</h2>
      <h3>Added Bloglists</h3>
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

export default UserDetails
