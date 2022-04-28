import React, {useState} from 'react'

const NotificationContext = React.createContext({})

const NotificationProvider: React.FC = () => {
  const [unreadNotification, setUnreadNotification] = useState(false)
  return (
    <NotificationContext.Provider
      value={[unreadNotification, setUnreadNotification]}
    ></NotificationContext.Provider>
  )
}

export {NotificationContext, NotificationProvider}
