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

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogListsRaw = useSelector((state) => state.blogs)
  const blogLists = blogListsRaw.toSorted((a, b) => b.likes - a.likes)
  const currentUser = useSelector((state) => state.user)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))

      blogService.setToken(user.token)
      dispatch(userSet(user))
      setUsername('')
      setPassword('')
      dispatch(createNotification(`${user.username} logged in.`))
    } catch (exception) {
      dispatch(createError(`wrong username or password: ${exception}`, 10000))
    }
  }

  const handleLikeSubmit = (id) => {
    const currentBloglist = blogLists.find((b) => b.id === id)
    const changedBloglist = {
      ...currentBloglist,
      likes: currentBloglist.likes + 1,
    }
    try {
      dispatch(updateBloglist(changedBloglist, currentUser))
      dispatch(createNotification(`${changedBloglist.title} liked!`))
    } catch (exception) {
      console.log('hit')
      dispatch(createError(`problem liking item: ${exception}`))
    }
  }

  const handleDeleteSubmit = (id) => {
    let confirmDelete = `Remove blog "${
      blogLists.find((b) => b.id === id).title
    }"`

    if (window.confirm(confirmDelete)) {
      try {
        dispatch(deleteBloglist(id))
        dispatch(createNotification('Blog listing deleted.'))
      } catch (exception) {
        dispatch(createError(`problem deleting item: ${exception}`))
      }
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(createNotification(`${currentUser.username} logged out.`))
    window.localStorage.removeItem('loggedBloglistUser')
    dispatch(userSet(null))
    setUsername('')
    setPassword('')
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      // setUser(user)
      dispatch(userSet(user))
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
          {currentUser.name} logged in
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
          {blogLists.map((blog) => {
            return (
              <div key={blog.id} className="blogListElement listing">
                <div className="blogShowElement">
                  <ToggleBlogView
                    blog={blog}
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

  const alertMessage = useSelector((state) => state.alert[0].message)
  const alertType = useSelector((state) => state.alert[0].alertType)

  return (
    <div>
      <Alert message={alertMessage} alertType={alertType} />
      <h2>blogs</h2>
      {currentUser === null ? loginForm() : bloglistForm()}
    </div>
  )
}

export default App
