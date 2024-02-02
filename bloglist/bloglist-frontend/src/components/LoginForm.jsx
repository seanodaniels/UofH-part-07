import { useSelector, useDispatch } from 'react-redux'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { createNotification, createError } from '../reducers/alertReducer'
import { userSet } from '../reducers/userReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.user)

  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(userSet(user))
      dispatch(createNotification(`${user.username} logged in.`))
    } catch (exception) {
      dispatch(createError(`wrong username or password: ${exception}`, 10000))
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(createNotification(`${currentUser.username} logged out.`))
    window.localStorage.removeItem('loggedBloglistUser')
    dispatch(userSet(null))
  }

  if (currentUser !== null) {
    return (
      <div id="app-login">
        {currentUser.name} logged in
        <form onSubmit={handleLogout}>
          <button className="login-logout" type="submit">
            logout
          </button>
        </form>
      </div>
    )
  } else {
    return (
      <div id="app-login">
        log in:
        <form onSubmit={handleLogin}>
          <span>
            username
            <input type="text" name="username" className="login-username" />
          </span>
          <span>
            password
            <input type="password" name="password" className="login-password" />
          </span>
          <button className="login-submit" type="submit">
            login
          </button>
        </form>
      </div>
    )
  }
}

export default LoginForm
