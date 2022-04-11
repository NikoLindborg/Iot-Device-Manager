import React, {useEffect, useState} from 'react'
import ChannelListComponent from '../../components/ChannelListComponent/ChannelListComponent'
import DeviceListComponent from '../../components/DeviceListComponent/DeviceListComponent'
import MenuComponent from '../../components/menu/MenuComponent'
import MobileMenuComponent from '../../components/menu/mobile/MobileMenuComponent'
import MobileNavigationComponent from '../../components/navigation/mobile/MobileNavigationComponent'
import NavigationComponent from '../../components/navigation/NavigationComponent'
import StatusComponent from '../../components/StatusComponent/StatusComponent'
import ChannelIcon from '../../assets/icons/channel_icon.svg'
import StatusRedIcon from '../../assets/icons/status_red.svg'
import './BaseView.css'
import {useDevices} from '../../hooks/ApiHooks'

const BaseView: React.FC = () => {
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

  const handleClick = (id: string) => {
    console.log(id)
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
        <StatusComponent />
        <ChannelListComponent
          componentItems={{
            icon: ChannelIcon,
            label: 'Temperature',
          }}
        />
        {devices.map((device) => (
          <DeviceListComponent
            id={device._id}
            key={device._id}
            componentItems={{
              icon: StatusRedIcon,
              label: device.name,
              info: 'Device is Offline',
            }}
            clickHandler={handleClick}
          />
        ))}
      </div>
    </div>
  )
}

export default BaseView
