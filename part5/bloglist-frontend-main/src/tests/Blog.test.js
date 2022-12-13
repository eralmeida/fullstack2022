import '@testing-library/jest-dom/extend-expect'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from '../components/Blog'
import BlogForm from '../components/blogForm'

test('blog: Upon rendering, it has title and author, but no url nor likes', () => {
  const blog = { title: 'title', author: 'author', url: 'url', likes: 0 }

  const { container } = render(<Blog blog={blog}></Blog>)
  const urlDiv = container.querySelector('.url')
  const likesDiv = container.querySelector('.likes')

  expect(urlDiv).toBeNull()
  expect(likesDiv).toBeNull()
})

test('blog: Upon clicking "Show", the url and likes are rendered', async () => {
  const blog = { title: 'title', author: 'author', url: 'url', likes: 0 }

  const { container } = render(<Blog blog={blog}></Blog>)

  const button = container.querySelector('.button')
  const user = userEvent.setup()
  await user.click(button)
  const urlDiv = container.querySelector('.url')
  const likesDiv = container.querySelector('.likes')

  expect(urlDiv).toHaveTextContent(`${blog.url}`)
  expect(likesDiv).toHaveTextContent(`likes ${blog.likes}`)
})

test('blog: Upon clicking the like button twice, the event handler is called twice', async () => {
  const blog = { title: 'title', author: 'author', url: 'url', likes: 0 }
  const mockLikeHandler = jest.fn()
  const { container } = render(<Blog blog={blog} incrementLike={mockLikeHandler}></Blog>)

  const showButton = container.querySelector('.button')
  const user = userEvent.setup()
  await user.click(showButton)
  const likeButton = screen.getByText('like')
  await user.dblClick(likeButton)

  expect(mockLikeHandler.mock.calls).toHaveLength(2)
})

test('blog: BlogForm should create the new form with the right details', async () => {
  const createBlogMockHandler = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlogMockHandler}></BlogForm>)
  const inputs = screen.getAllByRole('textbox')
  const saveButton = screen.getByText('Save')

  await user.type(inputs[0], 'ze title')
  await user.type(inputs[1], 'ze author')
  await user.type(inputs[2], 'ze url')
  await user.click(saveButton)

  expect(createBlogMockHandler.mock.calls).toHaveLength(1)
  expect(createBlogMockHandler.mock.calls[0][0].author).toBe('ze author')
  expect(createBlogMockHandler.mock.calls[0][0].title).toBe('ze title')
  expect(createBlogMockHandler.mock.calls[0][0].url).toBe('ze url')
})
