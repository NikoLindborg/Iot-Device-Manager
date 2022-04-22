import React, {useEffect, useState} from 'react'
import MobileMenuComponent from '../../components/menu/mobile/MobileMenuComponent'
import MobileNavigationComponent from '../../components/navigation/mobile/MobileNavigationComponent'
import NavigationComponent from '../../components/navigation/NavigationComponent'
import './DetailsView.css'
import {useDevices} from '../../hooks/ApiHooks'
import {IDevice} from '../../types/deviceType'
import DetailComponent from '../../components/DetailComponent/DetailComponent'

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
  const [trustedState, setTrustedState] = useState('')

  const handleResize = () => {
    window.innerWidth > 1000 ? setIsMobile(false) : setIsMobile(true)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    console.log('asd')
    const fetch = async () => {
      try {
        if (id) {
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
    if (device) {
      if (device.trustedState) {
        if (device.trustedState == 0) {
          setTrustedState('Online')
        }
        if (device.trustedState == 1) {
          setTrustedState('Offline')
        }
        if (device.trustedState == 2) {
          setTrustedState('Untrusted')
        }
      }
    }
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
            {/* Commented Menu out to remind to fix detail view not rendering the base view again */}
            {/* <MenuComponent devices={devices} /> */}
          </>
        )}
      </div>

      <div className="details-view-content-container">
        <div className="details-view-header">
          <h1>{device?.name}</h1>
          <p>{device?._id}</p>
        </div>
        <div className="details-view-body">
          {device?.trustedState ? (
            <DetailComponent
              componentItems={{
                label: trustedState,
              }}
            />
          ) : (
            <></>
          )}
          {device?.sensors ? (
            device.sensors.map((sensor) => (
              <DetailComponent
                key={device._id as string}
                componentItems={{
                  label: sensor,
                }}
              />
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  )
}

export default DetailsView
