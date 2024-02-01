import { useSelector, useDispatch } from 'react-redux'
import { updateBloglist, deleteBloglist } from '../reducers/blogReducer'
import { createNotification, createError } from '../reducers/alertReducer'
import { useMatch } from 'react-router-dom'

const Bloglist = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.user)
  const bloglists = useSelector((state) => state.blogs)

  const match = useMatch('/bloglist/:id')
  const bloglist = match
    ? bloglists.find((b) => b.id === match.params.id)
    : null

  const testingThing = () => {
    return (
      <button
        className="button-delete"
        onClick={handleDeleteSubmit}
        type="submit"
      >
        Delete
      </button>
    )
  }

  const handleLikeSubmit = () => {
    const currentBloglist = bloglist
    const changedBloglist = {
      ...currentBloglist,
      likes: currentBloglist.likes + 1,
    }
    try {
      dispatch(updateBloglist(changedBloglist, currentUser))
      dispatch(createNotification(`${changedBloglist.title} liked!`))
    } catch (exception) {
      dispatch(createError(`problem liking item: ${exception}`))
    }
  }

  const handleDeleteSubmit = () => {
    let confirmDelete = `Remove blog "${bloglist.title}"`

    if (window.confirm(confirmDelete)) {
      try {
        dispatch(deleteBloglist(bloglist.id))
        dispatch(createNotification('Blog listing deleted.'))
      } catch (exception) {
        dispatch(createError(`problem deleting item: ${exception}`))
      }
    }
  }

  // Prevent re-rendering if the user refreshes the browser
  if (!bloglist) {
    return null
  }

  return (
    <div>
      <span className="blog-title">{bloglist.title}</span> by{' '}
      <span className="blog-author">{bloglist.author}</span>
      <div className="bloglist-detail">
        <span className="blog-url">{bloglist.url}</span>
        <br />
        <span className="blog-likes">{bloglist.likes} likes</span>
        <button
          onClick={handleLikeSubmit}
          className="button-like"
          type="submit"
        >
          Like
        </button>
        <br />
        <span className="blog-username">added by {bloglist.user.username}</span>
        <br />
        {currentUser.username === bloglist.user.username
          ? testingThing()
          : null}
      </div>
    </div>
  )

  // console.log('test')

  // return (
  //   <div>
  //     <div>{bloglist.id}</div>
  //   </div>
  // )
}

export default Bloglist
