import React from 'react'
import {Link} from 'react-router-dom'
import type {IDevice} from '../../types/deviceType'
import DeviceListComponent from '../DeviceListComponent/DeviceListComponent'
import StatusRedIcon from '../../assets/icons/status_red.svg'

interface ListProps {
  devices: IDevice[]
  selectedChannel: string
}
const handleClick = (id: string) => {
  console.log(`device id, ${id}`)
}

const DeviceList: React.FC<ListProps> = ({devices, selectedChannel}) => {
  const mappedDevices = devices.map((device) => {
    if (
      // eslint-disable-next-line operator-linebreak
      device.channels?.includes(selectedChannel) ||
      selectedChannel == 'All Devices'
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
  return <div>{mappedDevices}</div>
}

export default DeviceList
