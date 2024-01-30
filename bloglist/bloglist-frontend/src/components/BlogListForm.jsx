import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addBloglist } from '../reducers/blogReducer'
import { createNotification } from '../reducers/alertReducer'

const BlogListForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')

  // const bloglistFormRef = useRef()

  const dispatch = useDispatch()

  const addBlogList = (event) => {
    event.preventDefault()
    // bloglistFormRef.current.toggleVisibility()
    dispatch(
      addBloglist({
        title: event.target.blogTitle.value,
        author: event.target.blogAuthor.value,
        url: event.target.blogUrl.value,
        likes: 0,
      })
    )
    dispatch(
      createNotification(
        `a new blog "${event.target.blogTitle.value}" by ${event.target.blogAuthor.value} added`
      )
    )
    setTitle('')
    setAuthor('')
    setUrl('')
    setLikes('')
  }

  return (
    <div>
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
    </div>
  )
}

export default BlogListForm
