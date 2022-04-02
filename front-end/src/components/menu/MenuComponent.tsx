import React from 'react'
import {Icon} from '@iconify/react'
import './MenuComponent.css'

const MenuComponent: React.FC = () => {
  return (
    <div>
      <div className="curve"></div>
      <div className="menu-container">
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
  )
}

export default MenuComponent
