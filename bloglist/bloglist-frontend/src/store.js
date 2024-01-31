import { configureStore } from '@reduxjs/toolkit'

import blogReducer from './reducers/blogReducer'
import alertReducer from './reducers/alertReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    alert: alertReducer,
    user: userReducer,
  },
})

console.log('STORE:', store.getState())

export default store