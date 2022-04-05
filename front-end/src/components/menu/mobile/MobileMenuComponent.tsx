import React from 'react'
import {Icon} from '@iconify/react'
import './MobileMenuComponent.css'

const MobileMenuComponent: React.FC = () => {
  return (
    <div>
      <div className="mobile-menu-container">
        <div className="mobile-icons">
          <Icon
            id="notifications"
            icon="ic:outline-notifications"
            color="white"
            width="24"
          />
          <Icon id="settings" icon="ci:settings" color="white" width="24" />
          <Icon id="profile" icon="gg:profile" color="white" width="24" />
        </div>
      </div>
    </div>
  )
}

export default MobileMenuComponent
