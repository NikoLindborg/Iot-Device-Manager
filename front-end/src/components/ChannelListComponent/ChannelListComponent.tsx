import React from 'react'
import './ChannelListComponent.css'

interface ChannelListProps {
  componentItems: {
    icon: string
    label: string
  }
}

const ChannelListComponent: React.FC<ChannelListProps> = ({componentItems}) => {
  return (
    <div className="channel-list-container">
      <div className="channel-list-left">
        <img className="channel-list-img" src={componentItems.icon}></img>
        <h2 className="channel-list-label">{componentItems.label}</h2>
      </div>
      <div className="channel-list-right">
        <p> {'>'} </p>
      </div>
    </div>
  )
}

export default ChannelListComponent
