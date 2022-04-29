import React, {useEffect, useState} from 'react'
import './DetailsView.css'
import {useDevices} from '../../hooks/ApiHooks'
import {IDevice} from '../../types/deviceType'
import DetailComponent from '../../components/DetailComponent/DetailComponent'
import StatusRedIcon from '../../assets/icons/status_red.svg'
import StatusGreenIcon from '../../assets/icons/status_green.svg'
import StatusYellowIcon from '../../assets/icons/status_yellow.svg'
import DataGraph from '../../components/DataGraph/DataGraph'
import {Link} from 'react-router-dom'

interface DetailsViewProps {
  id?: string
}

const DetailsView: React.FC<DetailsViewProps> = ({id}) => {
  const {fetchDevice} = useDevices()
  const [device, setDevice] = useState<IDevice>()
  const [statusIcon, setStatusIcon] = useState('')
  const [selectedData, setSelectedData] = useState('')

  useEffect(() => {
    const fetch = async () => {
      try {
        if (id) {
          const fetchedDevice = await fetchDevice(id)
          setDevice(fetchedDevice)
          if (fetchedDevice.channels) {
            setSelectedData(fetchedDevice.channels[0])
          }
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
          setStatusIcon(StatusGreenIcon)
        }
        if (device.trustedState == 1) {
          setStatusIcon(StatusRedIcon)
        }
        if (device.trustedState != 0 && device.trustedState != 1) {
          setStatusIcon(StatusYellowIcon)
        }
      }
    }
  }, [device?.trustedState])

  const setSelectedGraphData = (dataLabel: string) => {
    setSelectedData(dataLabel)
  }

  return (
    <div>
      <Link to={`/`} className="device-details-title">
        <p className="device-details-title">Back to device list</p>
      </Link>
      <div className="details-view-header">
        <img className="details-view-status-img" src={statusIcon}></img>
        <h1>{device?.name}</h1>
      </div>
      <div className="details-view-body">
        <div className="details-view-graph-container">
          <DataGraph
            dataGraphItems={{
              selectedData: selectedData,
              id: id,
            }}
          ></DataGraph>
        </div>
        <div className="details-view-component-header">
          <h1>Sort by</h1>
        </div>
        <div className="details-view-component-container">
          {device?.channels ? (
            device.channels.map((channel, i) => (
              <DetailComponent
                key={i}
                componentItems={{
                  label: channel,
                }}
                clickHandler={setSelectedGraphData}
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
