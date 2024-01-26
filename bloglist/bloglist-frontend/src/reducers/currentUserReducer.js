import { createSlice } from '@reduxjs/toolkit'

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: [],
  reducers: {
    setUser(state, action) {
    },
  }
})

export const {
  setUser
} = currentUserSlice.actions
export default currentUserSlice.reducer