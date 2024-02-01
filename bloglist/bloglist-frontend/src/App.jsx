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
import { useDispatch, useSelector } from 'react-redux'
import { initializeBloglist } from './reducers/blogReducer'
import { userSet } from './reducers/userReducer'

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
  }, [])

  // const bloglists = useSelector((state) => state.blogs)

  // const match = useMatch('/bloglist/:id')
  // const bloglist = match
  //   ? bloglists.find((b) => b.id === match.params.id)
  //   : null

  return (
    <div id="bloglist-body">
      <div className="nav">
        <Link to="/">blogs</Link>
      </div>
      <Alert />
      <h1>Bloglist</h1>
      <LoginForm />
      <Routes>
        <Route path="/bloglist/:id" element={<Bloglist />} />
        <Route path="/" element={<BloglistListing />} />
      </Routes>
    </div>
  )
}

export default App
