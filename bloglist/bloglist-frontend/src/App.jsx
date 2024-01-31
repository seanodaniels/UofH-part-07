import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Alert from './components/Alert'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogListForm from './components/BlogListForm'
import ToggleBlogView from './components/ToggleBlogView'
import { useDispatch, useSelector } from 'react-redux'
import {
  initializeBloglist,
  updateBloglist,
  deleteBloglist,
} from './reducers/blogReducer'
import { createNotification, createError } from './reducers/alertReducer'
import { userSet } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    // dispatch(initializeBloglist())
    // dispatch(createNotification(null))
  }, [])
  // console.log(store)
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const bloglistFormRef = useRef()

  const blogs1 = useSelector((state) => state.blogs)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      dispatch(userSet(user))
      dispatch(createNotification(`${user.username} logged in.`))
    } catch (exception) {
      dispatch(createError(`wrong username or password: ${exception}`, 10000))
    }
  }

  const handleLikeSubmit = (id) => {
    const currentBloglist = blogs1.find((b) => b.id === id)
    const changedBloglist = {
      ...currentBloglist,
      likes: currentBloglist.likes + 1,
    }
    dispatch(updateBloglist(changedBloglist))
    dispatch(createNotification(`${changedBloglist.title} liked!`))

    // blogService
    //   .update(id, changedBloglist)
    //   .then((o) => {
    //     const newBlogListing = blogs1.map((b) =>
    //       b.id !== id ? b : changedBloglist
    //     )
    //     // setBlogs(newBlogListing.sort((a, b) => b.likes - a.likes))
    //     console.log('nbl:', newBlogListing)
    //     dispatch(updateBloglist(newBlogListing))
    //     dispatch(createNotification(`${changedBloglist.title} liked!`))
    //   })
    //   .catch((e) => {
    //     dispatch(createError(`error with like on ${id}: ${e}`))
    //   })
  }

  const handleDeleteSubmit = (id) => {
    let confirmDelete = `Remove blog "${blogs1.find((b) => b.id === id).title}"`

    if (window.confirm(confirmDelete)) {
      dispatch(deleteBloglist(id))
      dispatch(createNotification('Blog listing deleted.'))
      // blogService
      //   .deleteBloglist(id)
      //   .then((o) => {
      //     const newBlogListing = blogs.filter((b) => b.id !== id)
      //     setBlogs(newBlogListing.sort((a, b) => b.likes - a.likes))
      //     dispatch(createNotification('Blog listing deleted.'))
      //   })
      //   .catch((e) => {
      //     dispatch(createError(`error with deletion of ${id}: ${e}`))
      //   })
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(createNotification(`${user.username} logged out.`))

    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
    setUsername('')
    setPassword('')
  }

  useEffect(() => {
    // blogService
    //   .getAll()
    //   .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))

    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      dispatch(userSet(user))
      console.log('hit from app.jsx', user)
      blogService.setToken(user.token)
    }

    dispatch(initializeBloglist())
  }, [])

  const loginForm = () => {
    return (
      <div>
        <Togglable buttonLabel="login">
          <LoginForm
            handleSubmit={handleLogin}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            username={username}
            password={password}
          />
        </Togglable>
      </div>
    )
  }

  const bloglistForm = () => {
    return (
      <div>
        <div className="loginBox">
          {user.name} logged in
          <form onSubmit={handleLogout}>
            <button className="login-logout" type="submit">
              logout
            </button>
          </form>
        </div>

        <div className="blogListElement">
          <Togglable className="add-new" buttonLabel="add new blog listing">
            <BlogListForm />
          </Togglable>
        </div>

        <div id="list-of-blogs">
          {blogs1.map((blog) => {
            return (
              <div key={blog.id} className="blogListElement listing">
                <div className="blogShowElement">
                  <ToggleBlogView
                    blog={blog}
                    currentUsername={user.username}
                    handleLikeSubmit={() => handleLikeSubmit(blog.id)}
                    handleDeleteSubmit={() => handleDeleteSubmit(blog.id)}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // <Notification message={notificationMessage} />

  const alertMessage = useSelector((state) => state.alert[0].message)
  const alertType = useSelector((state) => state.alert[0].alertType)

  return (
    <div>
      <Alert message={alertMessage} alertType={alertType} />
      <h2>blogs</h2>
      {user === null ? loginForm() : bloglistForm()}
    </div>
  )
}

export default App
