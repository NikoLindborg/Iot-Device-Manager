import React, {useEffect, useState} from 'react'
import MenuComponent from '../../components/menu/MenuComponent'
import MobileMenuComponent from '../../components/menu/mobile/MobileMenuComponent'
import MobileNavigationComponent from '../../components/navigation/mobile/MobileNavigationComponent'
import NavigationComponent from '../../components/navigation/NavigationComponent'
import './DetailsView.css'
import {useDevices} from '../../hooks/ApiHooks'
import { IDevice } from '../../types/deviceType'

interface DetailsViewProps {
  id?: string
}

const DetailsView: React.FC<DetailsViewProps> = ({id}) => {
  const [isMobile, setIsMobile] = useState(() => {
    return window.innerWidth > 1000 ? false : true
  })
  const {fetchDevice} = useDevices()
  const [open, setOpen] = useState(false)
  const [device, setDevice] = useState<IDevice>()

  const handleResize = () => {
    window.innerWidth > 1000 ? setIsMobile(false) : setIsMobile(true)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    console.log('asd')
    const fetch = async () => {
      try {
        if(id) {
          const fetchedDevice = await fetchDevice(id)
          setDevice(fetchedDevice)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetch()
  }, [])
  useEffect(() => {
    console.log(device)
  }, [device])

  const toggleMenu = () => {
    setOpen(!open)
  }


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
