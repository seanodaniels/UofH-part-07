import { createSlice } from '@reduxjs/toolkit'
import bloglistService from '../services/blogs'

const blogSlice = createSlice({
  name: 'bloglist',
  initialState: [],
  reducers: {
    createBloglist(state, action) {
    },
    deleteBloglist(state, action) {
    },
    updateBloglist(state, action) {
    },
    setBloglist(state, action) {
    },
  }
})

export const {
  createBloglist,
  deleteBloglist,
  updateBloglist,
  setBloglist,
} = blogSlice.actions

export const initializeBloglist = () => {
  // do getall on db
  // do a setBloglist(results)
  return async dispatch => {
    const allTheBloglists = await bloglistService.getAll()
    dispatch(setBloglist(allTheBloglists))
  }
}

export default blogSlice.reducer
