import { useSelector } from 'react-redux'

import Blog from '../components/Blog'

const BlogList = () => {
  const blogs = useSelector(({ blogs }) => blogs)

  // const dispatch = useDispatch()

  // const removeHandler = (blogObject) => {
  //   if (window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)) {
  //     dispatch(removeBlog(blogObject.id))
  //   }
  // }

  // const showBlogRemovalButtonHandler = (blogObject) => {
  //   return user !== null && blogObject.user.username === user.username
  // }

  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default BlogList
