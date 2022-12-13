import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogService'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    create(state, action) {
      state.push(action.payload)
    },
    incrementLikes(state, action) {
      const changedBlog = action.payload
      return state.map((blog) => (blog.id !== changedBlog.id ? blog : changedBlog))
    },
    setBlogs(_state, action) {
      return action.payload
    },
    remove(state, action) {
      const removedBlogId = action.payload
      return state.filter((blog) => blog.id !== removedBlogId)
    },
    addComment(state, action) {
      const changedBlog = action.payload
      return state.map((blog) => (blog.id !== changedBlog.id ? blog : changedBlog))
    },
  },
})

export const { create, incrementLikes, setBlogs, remove, addComment } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch(create(newBlog))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const votedBlog = { ...blog, likes: blog.likes + 1 }
    const updatedBlog = await blogService.update(votedBlog.id, votedBlog)
    dispatch(incrementLikes(updatedBlog))
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(remove(id))
  }
}

export const commentBlog = (blog, comment) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.comment(blog.id, { comment: comment })
    dispatch(addComment(updatedBlog))
  }
}

export default blogSlice.reducer
