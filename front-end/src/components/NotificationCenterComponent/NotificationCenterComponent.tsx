import React from 'react'
import {useNotifications} from '../../hooks/ApiHooks'
import NotificationComponent from '../NotificationComponent/NotificationComponent'
import './NotificationCenterComponent.css'

const NotificationCenterComponent: React.FC = () => {
  const {notifications} = useNotifications()
  console.log('notit', notifications)
  const mappedNotifications = notifications?.map((notification) => {
    return (
      <NotificationComponent
        notification={notification}
        key={notification._id}
      />
    )
  })
  return (
    <div className="notification-center">
      <div className="notification-header">Notifications</div>
      <div className="device-notifications">{mappedNotifications}</div>
    </div>
  )
}

export default NotificationCenterComponent
