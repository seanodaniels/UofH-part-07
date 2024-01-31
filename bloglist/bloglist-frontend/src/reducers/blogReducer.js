import { createSlice } from '@reduxjs/toolkit'
import bloglistService from '../services/blogs'

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
    },
  }
})

export const {
  appendBloglist,
  removeBloglist,
  changeBloglist,
  setBloglist,
} = blogSlice.actions

export const initializeBloglist = () => {
  // do getall on db
  // do a setBloglist(results)
  return async dispatch => {
    const allTheBloglists = await bloglistService
      .getAll()
    //.then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
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

export const updateBloglist = (bloglist) => {
  return async dispatch => {
    const id = bloglist.id
    const updatedBloglist = await bloglistService.update(id, bloglist)
    dispatch(changeBloglist(updatedBloglist))
  }
}

export const deleteBloglist = (id) => {
  return async dispatch => {
    const response = await bloglistService.deleteBloglist(id)
    console.log('response:', response)
    dispatch(removeBloglist(id))
  }
}

export default blogSlice.reducer
