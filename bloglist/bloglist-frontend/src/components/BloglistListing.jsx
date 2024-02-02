import { useDispatch, useSelector } from 'react-redux'
import BlogListForm from './BlogListForm'
import { Link } from 'react-router-dom'

const BloglistListing = () => {
  const blogsRaw = useSelector((state) => state.blogs)
  const blogs = blogsRaw.toSorted((a, b) => b.likes - a.likes)

  const currentUser = useSelector((state) => state.user)

  if (currentUser !== null) {
    return (
      <div id="list-of-blogs">
        <BlogListForm />
        {blogs.map((blog) => {
          return (
            <div
              key={blog.id}
              className="blogListElement blogShowElement listing"
            >
              <Link to={`/bloglist/${blog.id}`}>{blog.title}</Link>{' '}
              <em>
                by <Link to={`/users/${blog.user.id}`}>{blog.author}</Link>
              </em>
            </div>
          )
        })}
      </div>
    )
  }
}

export default BloglistListing
