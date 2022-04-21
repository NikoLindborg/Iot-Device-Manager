import React from 'react'
import './DetailComponent.css'

interface DetailProps {
  componentItems: {
    label: string
  }
  clickHandler: Function
}

const DetailComponent: React.FC<DetailProps> = ({
  componentItems,
  clickHandler,
}) => {
  return (
    <div
      className="detail-component-container"
      onClick={() => clickHandler(componentItems.label)}
    >
      <div className="detail-component-top"></div>
      <div className="detail-component-bottom">
        <h2 className="detail-component-label">{componentItems.label}</h2>
      </div>
    </div>
  )
}

export default DetailComponent
