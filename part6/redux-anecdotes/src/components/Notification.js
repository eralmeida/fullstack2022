import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    visibility: props.notifications ? 'visible' : 'hidden',
  }
  return <div style={style}>{props.notifications}</div>
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications,
  }
}

const mapDispatchProps = {
  setNotification,
}

const ConnectedNotification = connect(mapStateToProps, mapDispatchProps)(Notification)

export default ConnectedNotification
