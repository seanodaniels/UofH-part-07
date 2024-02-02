import { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useMatch,
} from 'react-router-dom'
import blogService from './services/blogs'
import BloglistListing from './components/BloglistListing'
import Alert from './components/Alert'
import LoginForm from './components/LoginForm'
import Bloglist from './components/Bloglist'
import UserDetails from './components/UserDetails'
import UserListing from './components/UserListing'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBloglist } from './reducers/blogReducer'
import { userSet } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(userSet(user))
      blogService.setToken(user.token)
    }

    dispatch(initializeBloglist())
    dispatch(initializeUsers())
  }, [])

  return (
    <div id="bloglist-body">
      <div className="nav">
        <Link to="/">blogs</Link>
        <Link to="/users">users</Link>
      </div>
      <Alert />
      <h1>Bloglist</h1>
      <LoginForm />
      <Routes>
        <Route path="/bloglist/:id" element={<Bloglist />} />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/users" element={<UserListing />} />
        <Route path="/" element={<BloglistListing />} />
      </Routes>
    </div>
  )
}

export default App
