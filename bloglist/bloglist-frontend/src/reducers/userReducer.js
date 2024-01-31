import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'currentUser',
  initialState: {},
  reducers: {
    userSet(state, action) {
      console.log('hit from userReducer')
      return action.payload
    }
  }
})

export const { userSet } = userSlice.actions
export default userSlice.reducer