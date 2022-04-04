import React from 'react'
import './DeviceListComponent.css'

interface DeviceListProps {
  componentItems: {
    icon: string
    label: string
    info: string
  }
}

const DeviceListComponent: React.FC<DeviceListProps> = ({componentItems}) => {
  return (
    <div className="device-list-container">
      <div className="device-list-left">
        <img className="device-list-img" src={componentItems.icon}></img>
        <div className="device-list-textcontainer">
          <h2 className="device-list-label">{componentItems.label}</h2>
          <p className="device-list-info">{componentItems.info}</p>
        </div>
      </div>
      <div className="device-list-right">
        <p> {'>'} </p>
      </div>
    </div>
  )
}

export default DeviceListComponent
