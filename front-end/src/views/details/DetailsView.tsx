import React, {useEffect, useState} from 'react'
import MobileMenuComponent from '../../components/menu/mobile/MobileMenuComponent'
import MobileNavigationComponent from '../../components/navigation/mobile/MobileNavigationComponent'
import NavigationComponent from '../../components/navigation/NavigationComponent'
import './DetailsView.css'
import {useDevices} from '../../hooks/ApiHooks'
import {IDevice} from '../../types/deviceType'
import DetailComponent from '../../components/DetailComponent/DetailComponent'
import StatusRedIcon from '../../assets/icons/status_red.svg'
import StatusGreenIcon from '../../assets/icons/status_green.svg'
import StatusYellowIcon from '../../assets/icons/status_yellow.svg'
import DataGraph from '../../components/DataGraph/DataGraph'
import {ISensorData} from '../../types/sensorDataType'

interface DetailsViewProps {
  id?: string
}

const DetailsView: React.FC<DetailsViewProps> = ({id}) => {
  const [isMobile, setIsMobile] = useState(() => {
    return window.innerWidth > 1000 ? false : true
  })
  const {fetchDevice, fetchDeviceData} = useDevices()
  const [open, setOpen] = useState(false)
  const [device, setDevice] = useState<IDevice>()
  const [deviceData, setDeviceData] = useState<ISensorData>()
  // const [trustedState, setTrustedState] = useState('')
  const [statusIcon, setStatusIcon] = useState('')

  const handleResize = () => {
    window.innerWidth > 1000 ? setIsMobile(false) : setIsMobile(true)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    const fetch = async () => {
      try {
        if (id) {
          const fetchedDevice = await fetchDevice(id)
          setDevice(fetchedDevice)
          const fetchedDeviceData = await fetchDeviceData(id)
          setDeviceData(fetchedDeviceData)
          console.log('detaisview', deviceData)
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
          // setTrustedState('Online')
          setStatusIcon(StatusGreenIcon)
        }
        if (device.trustedState == 1) {
          // setTrustedState('Offline')
          setStatusIcon(StatusRedIcon)
        }
        if (device.trustedState == 2) {
          // setTrustedState('Untrusted')
          setStatusIcon(StatusYellowIcon)
        }
      }
    }
  }, [device?.trustedState])

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
          <img className="details-view-status-img" src={statusIcon}></img>
          <h1>{device?.name}</h1>
        </div>
        <div className="details-view-body">
          <div className="details-view-graph-container">
            <DataGraph
              dataGraphItems={{
                deviceData: deviceData,
              }}
            ></DataGraph>
          </div>
          <div className="details-view-component-header">
            <h1>Sort by</h1>
          </div>
          <div className="details-view-component-container">
            {device?.sensors ? (
              device.sensors.map((sensor, i) => (
                <DetailComponent
                  key={i}
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
    </div>
  )
}

export default DetailsView
