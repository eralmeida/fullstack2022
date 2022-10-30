import React from 'react'
import { useState } from 'react'

const Blog = ({ blog, incrementLike, removeBlog, showRemovalButton }) => {
  const [visibleDetails, setVisibleDetails] = useState(false)

  const showDetails = () => {
    setVisibleDetails(!visibleDetails)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: 'flex',
    flexDirection: 'column',
  }

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} {blog.author}
        <button className="button" style={{ marginLeft: 10 }} onClick={showDetails}>
          {visibleDetails ? 'hide' : 'show'}
        </button>
      </div>
      {visibleDetails && (
        <div>
          <div className="url">{blog.url}</div>
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <div className="likes">likes {blog.likes}</div>
            <button id="likeButton" style={{ marginLeft: 10 }} onClick={() => incrementLike(blog)}>
              like
            </button>
          </div>
          <div className="author">{blog.author}</div>
          {showRemovalButton && (
            <div>
              <button onClick={() => removeBlog(blog)}>Remove</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
