import React from 'react'
import NokiaBellLabsLogo from '../../assets/NokiaBellLabsLogo'
import './NavigationComponent.css'
import {Icon} from '@iconify/react'

const NavigationComponent: React.FC = () => {
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
          />
          <Icon className="icon" icon="ci:settings" color="white" width="22" />
          <Icon className="icon" icon="gg:profile" color="white" width="22" />
        </div>
      </div>
    </div>
  )
}

export default NavigationComponent
