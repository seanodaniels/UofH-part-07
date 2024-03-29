import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addBloglist } from '../reducers/blogReducer'
import { createNotification } from '../reducers/alertReducer'

const BlogListForm = ({ createBlog }) => {
  // Control form entry
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [createVisible, setCreateVisible] = useState(false)

  // Store Stuff
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.user)

  const addBlogList = (event) => {
    event.preventDefault()
    setCreateVisible(false)
    dispatch(
      addBloglist(
        {
          title: event.target.blogTitle.value,
          author: event.target.blogAuthor.value,
          url: event.target.blogUrl.value,
          likes: 0,
        },
        currentUser
      )
    )
    dispatch(
      createNotification(
        `a new blog "${event.target.blogTitle.value}" by ${event.target.blogAuthor.value} added`
      )
    )
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  if (currentUser !== null) {
    const createShowButton = { display: createVisible ? 'none' : '' }
    const createForm = { display: createVisible ? '' : 'none' }

    return (
      <div>
        <div
          style={createForm}
          className="blogListElement blogCreate createVisible"
        >
          <h2>Enter a new blog</h2>
          <form onSubmit={addBlogList}>
            title:{' '}
            <input
              className="new-title"
              value={title}
              name="blogTitle"
              onChange={(event) => setTitle(event.target.value)}
            />
            <br />
            author:{' '}
            <input
              className="new-author"
              value={author}
              name="blogAuthor"
              onChange={(event) => setAuthor(event.target.value)}
            />
            <br />
            url:{' '}
            <input
              className="new-url"
              value={url}
              name="blogUrl"
              onChange={(event) => setUrl(event.target.value)}
            />
            <br />
            <button className="submit-new-blog" type="submit">
              save
            </button>
          </form>
          <button
            className="hide-create"
            onClick={() => setCreateVisible(false)}
          >
            cancel
          </button>
        </div>
        <div style={createShowButton} className="createHidden">
          <button
            className="show-create"
            onClick={() => setCreateVisible(true)}
          >
            create new bloglist
          </button>
        </div>
      </div>
    )
  }
}

export default BlogListForm
