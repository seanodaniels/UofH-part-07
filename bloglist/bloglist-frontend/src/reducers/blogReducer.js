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
    },
    changeBloglist(state, action) {
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

export const addBloglist = (content) => {
  return async dispatch => {
    const newBloglist = await bloglistService.create(content)
    dispatch(appendBloglist(newBloglist))
  }
}

export const updateBloglist = (bloglist) => {
  return async dispatch => {
    const updatedBloglist = await bloglistService.update(bloglist.id, bloglist.content)
  }
}

export default blogSlice.reducer
