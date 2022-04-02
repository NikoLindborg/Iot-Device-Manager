import React, {useEffect, useState} from 'react'
import MenuComponent from '../../components/menu/MenuComponent'
import MobileMenuComponent from '../../components/menu/mobile/MobileMenuComponent'
import MobileNavigationComponent from '../../components/navigation/mobile/MobileNavigationComponent'
import NavigationComponent from '../../components/navigation/NavigationComponent'
import './BaseView.css'

const BaseView: React.FC = () => {
  const [isMobile, setIsMobile] = useState(() => {
    return window.innerWidth > 1000 ? false : true
  })

  const handleResize = () => {
    window.innerWidth > 1000 ? setIsMobile(false) : setIsMobile(true)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
  })

  return (
    <div>
      {isMobile ? (
        <>
          <MobileNavigationComponent />
          <MobileMenuComponent />
        </>
      ) : (
        <>
          <NavigationComponent />
          <MenuComponent />
        </>
      )}
    </div>
  )
}

export default BaseView
