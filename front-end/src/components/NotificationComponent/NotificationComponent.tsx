import React from 'react'
import {INotification} from '../../types/notificationType'
import './NotificationComponent.css'

interface NotificationProps {
  notification: INotification
  deleteNotification: (id: string) => Promise<void>
}

const NotificationComponent: React.FC<NotificationProps> = ({
  notification,
  deleteNotification,
}) => {
  const epoch = parseFloat(notification.timestamp)
  const date = new Date(epoch * 1000).toLocaleDateString()
  const time = new Date(epoch * 1000).toLocaleTimeString()

  return (
    <div className="notification-component">
      <div
        className="status-dot"
        style={
          // eslint-disable-next-line prettier/prettier
          notification.status == 1 ? {background: '#49C364'} : notification.status == 2 ? {background: '#FA4C5C'} : {background: '#FFCD05'}
        }
      ></div>
      <div className="notification-text-container">
        <div className="notification-component-header bold">
          {notification.title}
        </div>
        <div className="notification-component-name description">
          Name: {notification.deviceName}
        </div>
        <div className="notification-component-channels description">
          Subscribed to:{' '}
          {notification.deviceChannels.map((channel) => `"${channel}" `)}
        </div>
        <div className="notification-component-timestamp description">
          {`${date} - ${time}`}
        </div>
      </div>
      <button
        className="delete-single-notification"
        onClick={() => deleteNotification(notification._id)}
      >
        X
      </button>
    </div>
  )
}

export default NotificationComponent
