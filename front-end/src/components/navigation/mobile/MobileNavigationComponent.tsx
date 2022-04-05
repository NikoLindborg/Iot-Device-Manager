import React from 'react'
import NokiaBellLabsLogo from '../../../assets/NokiaBellLabsLogo'
import './MobileNavigationComponent.css'
import {Icon} from '@iconify/react'

type ChildProps = {
  toggleMenu?: () => void
}

const MobileNavigationComponent: React.FC<ChildProps> = ({toggleMenu}) => {
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
