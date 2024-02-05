import { configureStore } from '@reduxjs/toolkit'

import blogReducer from './reducers/blogReducer'
import alertReducer from './reducers/alertReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'
import commentReducer from './reducers/commentReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    alert: alertReducer,
    user: userReducer,
    users: usersReducer,
    comments: commentReducer
  },
})

console.log('STORE:', store.getState())

export default store