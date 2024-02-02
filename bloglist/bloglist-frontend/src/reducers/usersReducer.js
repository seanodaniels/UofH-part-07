import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const usersSlice = createSlice({
  name: 'allUsers',
  initialState: null,
  reducers: {
    usersSet(state, action) {
      return action.payload
    }
  }
})

export const { usersSet } = usersSlice.actions

export const initializeUsers = () => {
  return async dispatch => {
    const allTheUsers = await usersService.getAll()
    dispatch(usersSet(allTheUsers))
  }
}

export default usersSlice.reducer