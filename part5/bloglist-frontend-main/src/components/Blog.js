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
    'flex-direction': 'column',
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button style={{ marginLeft: 10 }} onClick={showDetails}>
          {visibleDetails ? 'hide' : 'show'}
        </button>
      </div>
      {visibleDetails && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button style={{ marginLeft: 5 }} onClick={() => incrementLike(blog)}>
              like
            </button>
          </div>
          <div>{blog.author}</div>
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
