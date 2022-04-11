import React, {useEffect, useState} from 'react'
import MenuComponent from '../../components/menu/MenuComponent'
import MobileMenuComponent from '../../components/menu/mobile/MobileMenuComponent'
import MobileNavigationComponent from '../../components/navigation/mobile/MobileNavigationComponent'
import NavigationComponent from '../../components/navigation/NavigationComponent'
import './DetailsView.css'
import {useDevices} from '../../hooks/ApiHooks'

interface DetailsViewProps {
  id?: string
}

const DetailsView: React.FC<DetailsViewProps> = ({id}) => {
  const [isMobile, setIsMobile] = useState(() => {
    return window.innerWidth > 1000 ? false : true
  })
  const {devices} = useDevices()
  const [open, setOpen] = useState(false)

  const handleResize = () => {
    window.innerWidth > 1000 ? setIsMobile(false) : setIsMobile(true)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
  }, [])

  const toggleMenu = () => {
    setOpen(!open)
  }

  const device = devices.find((device) => device._id === id)

  return (
    <div className="details-view-container">
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
      <div className="details-view-content-container">
        <p>Device name: {device?.name}</p>
        <p> Device id: {device?._id}</p>
      </div>
    </div>
  )
}

export default DetailsView
