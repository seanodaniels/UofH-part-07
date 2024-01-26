import { createSlice } from '@reduxjs/toolkit'

const alertSlice = createSlice({
  name: 'alerts',
  initialState: '',
  reducers: {
    setAlert(state, action) {
      return action.payload
    },
    clearAlert(state, action) {
    }
  }
})

export const {
  setAlert,
  clearAlert
} = alertSlice.actions

export const createAlert = (content, timeOut = 3000) => {
  return async dispatch => {
    dispatch(setAlert(content))
    setTimeout(() => {
      dispatch(setAlert(null))
    }, timeOut)
  }
}

export default alertSlice.reducer