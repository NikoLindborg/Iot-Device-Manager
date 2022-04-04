import React from 'react'
import NokiaBellLabsLogo from '../../../assets/NokiaBellLabsLogo'
import './MobileNavigationComponent.css'
import {Icon} from '@iconify/react'

const MobileNavigationComponent: React.FC = ({toggleMenu}) => {
  return (
    <div className="nav-bar">
      <NokiaBellLabsLogo />
      <div className="burger" onClick={toggleMenu}>
        <Icon id="burger" icon="eva:menu-fill" color="white" width="28" />
      </div>
    </div>
  )
}

export default MobileNavigationComponent
