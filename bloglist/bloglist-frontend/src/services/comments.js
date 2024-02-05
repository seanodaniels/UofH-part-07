import axios from 'axios'
const baseUrl = '/api/comments/'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

// const create = async (comment) => {
//   console.log('content', comment.content)
//   console.log('id', comment.bloglistId)
//   const addCommentUrl = `/api/blogs/${comment.bloglistId}/comment`
//   console.log('addcommenturl', addCommentUrl)
//   const response = await axios.post(addCommentUrl, comment)
//   return response.data
// }

export default {
  getAll,
  // create,
}