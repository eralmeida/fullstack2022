import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'

import { commentBlog, likeBlog } from '../reducers/blogReducer'

const BlogDetails = () => {
  const [comment, setComment] = useState('')

  const blogs = useSelector(({ blogs }) => blogs)
  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null

  const dispatch = useDispatch()
  const incrementLikes = (blog) => {
    dispatch(likeBlog(blog))
  }

  const commentOnBlog = (event) => {
    event.preventDefault()
    dispatch(commentBlog(blog, comment))
    setComment('')
  }

  if (!blog) {
    return <div>... No blog found!</div>
  }

  return (
    <>
      <h2>
        {blog.title} {blog.author}
      </h2>

      <div>
        <a href={blog.url}>{blog.url}</a>
        <div>
          {blog.likes} likes
          <button id="likeButton" style={{ marginLeft: 10 }} onClick={() => incrementLikes(blog)}>
            like
          </button>
        </div>
        <div>added by {blog.user.name}</div>
        <div>
          <h2>comments</h2>
          <form onSubmit={commentOnBlog}>
            <div>
              <input type="text" value={comment} name="Comment" onChange={({ target }) => setComment(target.value)}></input>
              <button type="submit">add comment</button>
            </div>
          </form>
          {blog.comments.length === 0 && <p>... No comments to show</p>}
          {blog.comments.length > 0 && (
            <ul>
              {blog.comments.map((comment) => (
                <li key={comment}>{comment}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}

export default BlogDetails
