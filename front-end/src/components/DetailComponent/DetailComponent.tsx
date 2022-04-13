import React from 'react'
import './DetailComponent.css'

interface DetailProps {
  componentItems: {
    label: string
  }
}

const DetailComponent: React.FC<DetailProps> = ({componentItems}) => {
  return (
    <div className="detail-component-container">
      <div className="detail-component-top"></div>
      <div className="detail-component-bottom">
        <h2 className="detail-component-label">{componentItems.label}</h2>
      </div>
    </div>
  )
}

export default DetailComponent
