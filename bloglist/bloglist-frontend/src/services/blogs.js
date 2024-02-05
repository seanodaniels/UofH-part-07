import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const createComment = async (comment) => {
  const config = {
    headers: { Authorization: token },
  }
  console.log('content', comment.content)
  console.log('id', comment.bloglistId)
  const addCommentUrl = `/api/blogs/${comment.bloglistId}/comment`
  console.log('addcommenturl', addCommentUrl)
  const response = await axios.post(addCommentUrl, comment, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then((r) => r.data)
}

const deleteBloglist = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then((r) => r.data)
}

export default {
  getAll,
  setToken,
  create,
  update,
  deleteBloglist,
  createComment,
}
