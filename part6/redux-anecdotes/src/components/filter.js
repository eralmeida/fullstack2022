import React from 'react'
import { useDispatch } from 'react-redux'

const Filter = () => {
  const dispatch = useDispatch()
  const handleChange = (event) => {
    dispatch({ type: 'filter/set', payload: event.target.value })
  }
  const style = { marginBottom: 10 }

  return (
    <div style={style}>
      filter <input onChange={handleChange}></input>
    </div>
  )
}

export default Filter