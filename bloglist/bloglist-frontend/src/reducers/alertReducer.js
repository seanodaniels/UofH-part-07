import { createSlice } from '@reduxjs/toolkit'

const alertSlice = createSlice({
  name: 'alerts',
  initialState: [],
  reducers: {
    createError(state, action) {
    },
    createNotification(state, action) {
    },
    clearAlert(state, action) {
    }
  }
})

export const {
  createError,
  createNotification,
  clearAlert
} = alertSlice.actions
export default alertSlice.reducer