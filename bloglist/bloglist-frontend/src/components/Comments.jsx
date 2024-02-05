import { useSelector } from 'react-redux'

const Comments = (content) => {
  const allComments = useSelector((state) => state.comments)
  const bloglistId = content.blogId
  const thisComments = allComments.filter((c) => c.bloglistId === bloglistId)
  if (thisComments.length > 0) {
    return (
      <div id="comments">
        <h4>Comments</h4>
        <ul>
          {thisComments.map((c) => {
            return <li key={c.id}>{c.content}</li>
          })}
        </ul>
      </div>
    )
  }
}

export default Comments
