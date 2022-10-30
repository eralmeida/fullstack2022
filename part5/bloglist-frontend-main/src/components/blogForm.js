import React from 'react'
import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      author: author,
      title: title,
      url: url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create a new Blog</h2>
      <form onSubmit={addBlog}>
        <div>
          Title: <input id="title" type="text" value={title} name="Title" onChange={({ target }) => setTitle(target.value)}></input>
        </div>
        <div>
          Author: <input id="author" type="text" value={author} name="Author" onChange={({ target }) => setAuthor(target.value)}></input>
        </div>
        <div>
          Url: <input id="url" type="text" value={url} name="URL" onChange={({ target }) => setUrl(target.value)}></input>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default BlogForm
