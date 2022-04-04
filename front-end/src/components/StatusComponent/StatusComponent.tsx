import React from 'react'
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'
import {Doughnut} from 'react-chartjs-2'
import './StatusComponent.css'

ChartJS.register(ArcElement, Tooltip, Legend)

//  Hardcoded data for now, until we receive data from the backend

const offlineDeviceAmount = 2
const untrustedDeviceAmount = 1
const trustedDeviceAmount = 7
const totalDeviceAmount = offlineDeviceAmount + untrustedDeviceAmount + trustedDeviceAmount

const data = {
  datasets: [
    {
      data: [offlineDeviceAmount, untrustedDeviceAmount, trustedDeviceAmount],
      backgroundColor: ['#FA4C5C', '#FFCD05', '#48C864'],
      borderWidth: 0,
      cutout: '70%',
    },
  ],
}

export const StatusComponent = () => {
  return (
    <div className="status-container">
      <Doughnut data={data} />
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

export default {trustedDeviceAmount}
