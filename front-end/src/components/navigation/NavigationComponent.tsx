import React from 'react'
import NokiaBellLabsLogo from '../../assets/NokiaBellLabsLogo'
import './NavigationComponent.css'
import {Icon} from '@iconify/react'

type ChildProps = {
  toggleNotificationCenter?: () => void
  unreadNotifications: boolean
}

const NavigationComponent: React.FC<ChildProps> = ({
  toggleNotificationCenter,
  unreadNotifications,
}) => {
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
        {unreadNotifications && <div className="red-dot"></div>}
      </div>
    </div>
  )
}

export default NavigationComponent
