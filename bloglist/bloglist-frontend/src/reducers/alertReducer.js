import { createSlice } from '@reduxjs/toolkit'

const alertSlice = createSlice({
  name: 'alerts',
  initialState: [{
    message: 'hi',
    alertType: 'CLEAR',
  }],
  reducers: {
    setNotification(state, action) {
      const content = action.payload
      return [{
        message: content,
        alertType: 'NOTIFICATION',
      }]
    },
    setError(state, action) {
      const content = action.payload
      return [{
        message: content,
        alertType: 'ERROR',
      }]
    },
    clearAlert(state, action) {
      return [{
        message: null,
        alertType: 'CLEAR',
      }]
    }
  }
})

export const {
  setNotification,
  setError,
  clearAlert
} = alertSlice.actions

export const createNotification = (content, timeOut = 3000) => {
  return async dispatch => {
    dispatch(setNotification(content))
    setTimeout(() => {
      dispatch(clearAlert())
    }, timeOut)
  }
}

export const createError = (content, timeOut = 3000) => {
  return async dispatch => {
    dispatch(setError(content))
    setTimeout(() => {
      dispatch(clearAlert())
    }, timeOut)
  }
}

export default alertSlice.reducer