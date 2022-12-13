import { useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'

const User = () => {
  const users = useSelector(({ users }) => users)
  const match = useMatch('/users/:id')
  const user = match ? users.find((user) => user.id === match.params.id) : null

  if (!user) {
    return <div>...User not found</div>
  }

  return (
    <>
      <h2>{user.name}</h2>
      <h4>added blogs</h4>
      {user.blogs.length > 0 && (
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      )}
      {user.blogs.length === 0 && <div>... No blogs for this user</div>}
    </>
  )
}

export default User
