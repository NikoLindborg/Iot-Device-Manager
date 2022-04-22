import React from 'react'
import NokiaBellLabsLogo from '../../assets/NokiaBellLabsLogo'
import './NavigationComponent.css'
import {Icon} from '@iconify/react'

type ChildProps = {
  toggleNotificationCenter?: () => void
}

const NavigationComponent: React.FC<ChildProps> = ({
  toggleNotificationCenter,
}) => {
  return (
    <div className="nav-bar">
      <NokiaBellLabsLogo />
      <div className="desktop-icons">
        <div className="icon-container">
          <Icon
            className="icon"
            icon="ic:outline-notifications"
            color="white"
            width="22"
            onClick={toggleNotificationCenter}
          />
        </div>
      </div>
    </div>
  )
}

export default NavigationComponent
