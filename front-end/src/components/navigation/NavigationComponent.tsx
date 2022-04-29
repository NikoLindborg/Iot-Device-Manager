import React, {useContext} from 'react'
import NokiaBellLabsLogo from '../../assets/NokiaBellLabsLogo'
import './NavigationComponent.css'
import {Icon} from '@iconify/react'
import {
  INotifications,
  NotificationContext,
} from '../../contexts/NotificationContext'

type ChildProps = {
  toggleNotificationCenter?: () => void
}

const NavigationComponent: React.FC<ChildProps> = ({
  toggleNotificationCenter,
}) => {
  const {unreadNotification} = useContext(NotificationContext) as INotifications
  return (
    <div className="nav-bar">
      <NokiaBellLabsLogo />
      <div className="icon-container">
        <Icon
          className="icon"
          icon="ic:outline-notifications"
          color="white"
          width="22"
          onClick={toggleNotificationCenter}
        />
        {unreadNotification ? <div className="red-dot"></div> : <></>}
      </div>
    </div>
  )
}

export default NavigationComponent
