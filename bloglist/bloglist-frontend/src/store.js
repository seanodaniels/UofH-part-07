import { configureStore } from '@reduxjs/toolkit'

import blogReducer from './reducers/blogReducer'
import alertReducer from './reducers/alertReducer'
import currentUserReducer from './reducers/currentUserReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    alert: alertReducer,
    currentUserReducer: currentUserReducer,
  },
})

console.log(store.getState())

export default store