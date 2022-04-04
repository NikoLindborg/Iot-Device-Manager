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

  const [open, setOpen] = useState(false)

  const handleResize = () => {
    window.innerWidth > 1000 ? setIsMobile(false) : setIsMobile(true)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
  })

  const toggleMenu = () => {
    setOpen(!open)
  }

  return (
    <div className="base-view-container">
      <div>
        {isMobile ? (
          <>
            <MobileNavigationComponent toggleMenu={toggleMenu} />
            {open && <MobileMenuComponent />}
          </>
        ) : (
          <>
            <NavigationComponent />
            <MenuComponent />
          </>
        )}
      </div>
      <div className="base-view-content-container">
        {/* Content comes here */}
        <h1>Device</h1>
        <h1>Device</h1>
        <h1>Device</h1>
        <h1>Device</h1>
        <h1>Device</h1>
        <h1>Device</h1>
      </div>
    </div>
  )
}

export default BaseView
