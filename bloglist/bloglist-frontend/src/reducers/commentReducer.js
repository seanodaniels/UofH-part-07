import { createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comments'
import bloglistService from '../services/blogs'

const commentSlice = createSlice({
  name: 'comments',
  initialState: [],
  reducers: {
    setComment(state, action) {
      return action.payload
    },
    appendComment(state, action) {
      state.push(action.payload)
    }
  }
})

export const {
  setComment,
  appendComment,
} = commentSlice.actions

export const initializeComments = () => {
  return async dispatch => {
    const allTheComments = await commentService
      .getAll()
    dispatch(setComment(allTheComments))
  }
}

export const addComment = (commentObject) => {
  return async dispatch => {
    console.log('commentObject', commentObject)
    const newComment = await bloglistService.createComment(commentObject)
    dispatch(appendComment(newComment))
  }
}

export default commentSlice.reducer