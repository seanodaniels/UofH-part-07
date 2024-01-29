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
import { initializeBloglist } from './reducers/blogReducer'
import { createNotification, createError } from './reducers/alertReducer'

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
      dispatch(createNotification(`${user.username} logged in.`))
    } catch (exception) {
      dispatch(createError('wrong username or password'))
    }
  }

  const handleLikeSubmit = (id) => {
    const currentBloglist = blogs.find((b) => b.id === id)
    const changedBlogListing = {
      ...currentBloglist,
      likes: currentBloglist.likes + 1,
    }

    blogService
      .update(id, changedBlogListing)
      .then((o) => {
        const newBlogListing = blogs.map((b) =>
          b.id !== id ? b : changedBlogListing
        )
        setBlogs(newBlogListing.sort((a, b) => b.likes - a.likes))
        dispatch(createNotification(`${changedBlogListing.title} liked!`))
      })
      .catch((e) => {
        dispatch(createError(`error with like on ${id}: ${e}`))
      })
  }

  const handleDeleteSubmit = (id) => {
    let confirmDelete = `Remove blog "${blogs.find((b) => b.id === id).title}"`
    if (window.confirm(confirmDelete)) {
      blogService
        .deleteBloglist(id)
        .then((o) => {
          const newBlogListing = blogs.filter((b) => b.id !== id)
          setBlogs(newBlogListing.sort((a, b) => b.likes - a.likes))
          dispatch(createNotification('Blog listing deleted.'))
        })
        .catch((e) => {
          dispatch(createError(`error with deletion of ${id}: ${e}`))
        })
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

  const addBloglist = (blogObject) => {
    bloglistFormRef.current.toggleVisibility()

    blogService
      .create(blogObject)
      .then((o) => {
        const addUserToBlog = { ...o, user: user } // add in missing user
        const blogsWithNewentry = blogs.concat(addUserToBlog)
        setBlogs(blogsWithNewentry.sort((a, b) => b.likes - a.likes))
        dispatch(
          createNotification(`a new blog "${o.title}" by ${o.author} added`)
        )
      })
      .catch((error) => {
        dispatch(createError(`ERROR: ${error}`))
      })
  }

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
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
          <Togglable
            className="add-new"
            buttonLabel="add new blog listing"
            ref={bloglistFormRef}
          >
            <BlogListForm createBlog={addBloglist} />
          </Togglable>
        </div>

        <div id="list-of-blogs">
          {blogs.map((blog) => {
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
