import { createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comments'

const commentSlice = createSlice({
  name: 'comments',
  initialState: [],
  reducers: {
    setComment(state, action) {
      return action.payload
    },
  }
})

export const {
  setComment,
} = commentSlice.actions

export const initializeComments = () => {
  return async dispatch => {
    const allTheComments = await commentService
      .getAll()
    dispatch(setComment(allTheComments))
  }
}

export default commentSlice.reducer