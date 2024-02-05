import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import bloglistService from '../services/blogs'
import commentService from '../services/comments'

const blogSlice = createSlice({
  name: 'bloglist',
  initialState: [],
  reducers: {
    appendBloglist(state, action) {
      state.push(action.payload)
    },
    removeBloglist(state, action) {
      const id = action.payload
      return state.filter(s => s.id !== id)
    },
    changeBloglist(state, action) {
      const changedBloglist = action.payload
      return state.map(s => s.id === changedBloglist.id ? changedBloglist : s)
    },
    setBloglist(state, action) {
      return action.payload
    }
  }
})

export const {
  appendBloglist,
  removeBloglist,
  changeBloglist,
  setBloglist,
} = blogSlice.actions

export const initializeBloglist = () => {
  return async dispatch => {
    const allTheBloglists = await bloglistService
      .getAll()
    dispatch(setBloglist(allTheBloglists))
  }
}

export const addBloglist = (blogListObject, currentUser) => {
  return async dispatch => {
    const newBloglist = await bloglistService.create(blogListObject)
    // Replace received user string value with the user store object
    const newBloglistWithUser = {
      ...newBloglist,
      user: currentUser
    }
    dispatch(appendBloglist(newBloglistWithUser))
  }
}

export const updateBloglist = (bloglist, currentUser) => {
  return async dispatch => {
    const id = bloglist.id
    const updatedBloglist = await bloglistService.update(id, bloglist)
    const updatedBloglistWithUser = {
      ...updatedBloglist,
      user: currentUser
    }
    dispatch(changeBloglist(updatedBloglistWithUser))
  }
}

export const deleteBloglist = (id) => {
  return async dispatch => {
    const response = await bloglistService.deleteBloglist(id)
    dispatch(removeBloglist(id))
  }
}

export const addComment = (comment, id) => {
  return async dispatch => {
    const response = await commentService.create(comment, id)
  }
}

export default blogSlice.reducer
