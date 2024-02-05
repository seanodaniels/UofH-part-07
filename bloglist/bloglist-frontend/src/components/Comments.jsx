import { useSelector, useDispatch } from 'react-redux'
import { addComment } from '../reducers/commentReducer'
import { createNotification } from '../reducers/alertReducer'

const Comments = (content) => {
  const allComments = useSelector((state) => state.comments)
  const bloglistId = content.blogId
  const thisComments = allComments.filter((c) => c.bloglistId === bloglistId)

  const dispatch = useDispatch()

  const handleAddComment = (event) => {
    event.preventDefault()
    const newComment = {
      content: event.target.addCommentInput.value,
      bloglistId: bloglistId,
    }
    console.log('comment', newComment)
    dispatch(
      addComment({
        content: event.target.addCommentInput.value,
        bloglistId: bloglistId,
      })
    )
    dispatch(createNotification('Comment Added.'))
  }

  const AddComment = () => {
    return (
      <div id="add-comment">
        <form onSubmit={handleAddComment}>
          <input name="addCommentInput" />
          <button type="submit">add comment</button>
        </form>
      </div>
    )
  }

  if (thisComments.length > 0) {
    return (
      <div id="comments">
        <h4>Comments</h4>
        <AddComment />
        <ul>
          {thisComments.map((c) => {
            return <li key={c.id}>{c.content}</li>
          })}
        </ul>
      </div>
    )
  } else {
    return (
      <div id="comments">
        <h4>Comments</h4>
        <AddComment />
      </div>
    )
  }
}

export default Comments
