import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import type {IDevice} from '../../types/deviceType'
import DeviceListComponent from '../DeviceListComponent/DeviceListComponent'
import StatusRedIcon from '../../assets/icons/status_red.svg'
import './DeviceList.css'

interface ListProps {
  devices: IDevice[]
  selectedChannel: string
  selectedStatus: string
}
const handleClick = (id: string) => {
  console.log(`device id, ${id}`)
}

const DeviceList: React.FC<ListProps> = ({
  devices,
  selectedChannel,
  selectedStatus,
}) => {
  const [statusFilter, setStatusFilter] = useState<number | null>(null)

  useEffect(() => {
    //  Simple solution for receiving data that we will get from the Nokia Attestation later on
    if (selectedStatus == 'All Devices') {
      setStatusFilter(null)
    }
    if (selectedStatus == 'Trusted') {
      setStatusFilter(1)
    }
    if (selectedStatus == 'Offline') {
      setStatusFilter(2)
    }
    if (selectedStatus == 'Untrusted') {
      setStatusFilter(3)
    }
  }, [selectedStatus])

  const mappedDevicesByChannel = devices.map((device) => {
    if (
      // eslint-disable-next-line operator-linebreak
      device.channels?.includes(selectedChannel) ||
      selectedChannel == 'All Channels'
    ) {
      return device
    }
  })

  const mappedDevicesByState = devices.map((device) => {
    if (device.trustedState == statusFilter || !statusFilter) {
      return device
    }
  })

  //  Map that contains devices that are in both filtered lists
  const mappedDevices = devices.map((device) => {
    if (
      // eslint-disable-next-line operator-linebreak
      mappedDevicesByChannel.includes(device) &&
      mappedDevicesByState.includes(device)
    ) {
      return (
        <Link
          to={`/${device._id}`}
          key={device._id as number}
          style={{textDecoration: 'none'}}
        >
          <DeviceListComponent
            id={device._id as string}
            key={device._id as number}
            componentItems={{
              icon: StatusRedIcon,
              label: device.name,
              info: 'Device is Offline',
            }}
            clickHandler={handleClick}
          />
        </Link>
      )
    }
  })
  return mappedDevices.filter(Boolean).length ? (
    <div className="device-list-container">{mappedDevices}</div>
  ) : (
    <div className="no-device">No devices</div>
  )
}

export default DeviceList
