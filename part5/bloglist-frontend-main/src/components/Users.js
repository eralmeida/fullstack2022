import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { getAllUsers } from '../reducers/usersReducer'

const Users = () => {
  const users = useSelector(({ users }) => users)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  const gridStyles = {
    container: {
      display: 'grid',
      gridTemplateColumns: 'minmax(min-content,max-content)',
    },
    childRow: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridColumnGap: '20px',
    },
  }

  return (
    <div>
      <h2>Users</h2>
      <div>
        <div style={gridStyles.container}>
          <div style={gridStyles.childRow}>
            <div></div>
            <div>
              <b>blogs created</b>
            </div>
          </div>
          {users.map((user) => (
            <div key={user.id} style={gridStyles.childRow}>
              <div>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </div>
              <div>{user.blogs.length} </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Users
