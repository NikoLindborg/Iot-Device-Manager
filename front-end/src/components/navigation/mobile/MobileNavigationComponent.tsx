import React from 'react'
import NokiaBellLabsLogo from '../../../assets/NokiaBellLabsLogo'
import './MobileNavigationComponent.css'
import {Icon} from '@iconify/react'

type ChildProps = {
  toggleMenu?: () => void
  unreadNotifications: boolean
}

const MobileNavigationComponent: React.FC<ChildProps> = ({
  toggleMenu,
  unreadNotifications,
}) => {
  return (
    <div className="nav-bar">
      <NokiaBellLabsLogo />
      <div className="icon-container" onClick={toggleMenu}>
        <Icon
          className="icon"
          icon="ic:outline-notifications"
          color="white"
          width="22"
        />
        {unreadNotifications && <div className="red-dot"></div>}
      </div>
    </div>
  )
}

export default MobileNavigationComponent
