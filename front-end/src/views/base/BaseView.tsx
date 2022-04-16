import React, {useEffect, useState} from 'react'
import MenuComponent from '../../components/menu/MenuComponent'
import MobileMenuComponent from '../../components/menu/mobile/MobileMenuComponent'
import MobileNavigationComponent from '../../components/navigation/mobile/MobileNavigationComponent'
import NavigationComponent from '../../components/navigation/NavigationComponent'
import StatusComponent from '../../components/StatusComponent/StatusComponent'
import './BaseView.css'
import {useDevices} from '../../hooks/ApiHooks'
import DropDown from '../../components/DropDownComponent/DropDown'
import DeviceList from '../../components/DeviceList/DeviceList'

const BaseView: React.FC = () => {
  const [isMobile, setIsMobile] = useState(() => {
    return window.innerWidth > 1000 ? false : true
  })
  const {devices} = useDevices()
  const [open, setOpen] = useState(false)

  //  Variables needed for Channel DropDown
  const initialChannel = 'All Channels'
  const [selectedChannel, setSelectedChannel] = useState(initialChannel)
  const listOfChannels = [initialChannel]

  //  Variables needed for Device DropDown
  const initialStatus = 'All Devices'
  const [selectedStatus, setSelectedStatus] = useState(initialStatus)
  const listOfStatus = [initialStatus, 'Trusted', 'Offline', 'Untrusted']

  const handleResize = () => {
    window.innerWidth > 1000 ? setIsMobile(false) : setIsMobile(true)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
  }, [])

  const toggleMenu = () => {
    setOpen(!open)
  }

  devices.forEach((device) => {
    device.channels?.forEach((channel) => {
      if (!listOfChannels.includes(channel)) {
        listOfChannels.push(channel)
      }
    })
  })

  return (
    <div className="base-view-container">
      <div>
        {isMobile ? (
          <>
            <MobileNavigationComponent toggleMenu={toggleMenu} />
            {open && <MobileMenuComponent />}
            <div className="mobile-status-container">
              <StatusComponent devices={devices} />
            </div>
          </>
        ) : (
          <>
            <NavigationComponent />
            <MenuComponent devices={devices} />
          </>
        )}
      </div>
      <div className="base-view-content-container">
        {/* Content comes here */}
        <div className="device-list-title">Devices</div>
        <div className="dropdown-base-container">
          <DropDown
            elements={listOfStatus}
            selectedElement={selectedStatus}
            setSelectedElement={setSelectedStatus}
          />
          <DropDown
            elements={listOfChannels}
            selectedElement={selectedChannel}
            setSelectedElement={setSelectedChannel}
          />
        </div>
        <DeviceList
          devices={devices}
          selectedChannel={selectedChannel}
          selectedStatus={selectedStatus}
        />
      </div>
    </div>
  )
}

export default BaseView
