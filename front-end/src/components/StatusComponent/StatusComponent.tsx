import React from 'react'
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'
import {Doughnut} from 'react-chartjs-2'
import './StatusComponent.css'

ChartJS.register(ArcElement, Tooltip, Legend)

//  Hardcoded data for device amounts for now, until we receive data from the backend

const offlineDeviceAmount = 2
const untrustedDeviceAmount = 1
const trustedDeviceAmount = 7
const totalDeviceAmount =
  offlineDeviceAmount + untrustedDeviceAmount + trustedDeviceAmount

//  Data includind the datasets-property that the Doughtnut requires
const statusComponentData = {
  datasets: [
    {
      data: [offlineDeviceAmount, untrustedDeviceAmount, trustedDeviceAmount],
      backgroundColor: ['#FA4C5C', '#FFCD05', '#48C864'],
      borderWidth: 0,
      cutout: '70%',
    },
  ],
}

export const StatusComponent: React.FC = () => {
  return (
    <div className="status-container">
      <Doughnut data={statusComponentData} />
      <div className="status-description-container">
        <div className="status-description">
          <p>
            {trustedDeviceAmount}/{totalDeviceAmount}
          </p>
          <p>Trusted</p>
        </div>
      </div>
    </div>
  )
}
