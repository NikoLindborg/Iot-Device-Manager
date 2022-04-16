import React from 'react'
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'
import {Doughnut} from 'react-chartjs-2'
import './StatusComponent.css'
import {IDevice} from '../../types/deviceType'

ChartJS.register(ArcElement, Tooltip, Legend)

interface StatusComponentProps {
  devices: IDevice[]
}

const StatusComponent: React.FC<StatusComponentProps> = ({devices}) => {
  const calculateDeviceStatuses = (status: number) =>
    devices.filter((device) => device.trustedState === status).length

  const statusData = {
    totalDeviceAmount: devices.length,
    trustedDeviceAmount: calculateDeviceStatuses(1),
    offlineDeviceAmount: calculateDeviceStatuses(2),
    untrustedDeviceAmount: calculateDeviceStatuses(3),
  }

  const statusComponentData = {
    datasets: [
      {
        data: [
          statusData.trustedDeviceAmount,
          statusData.offlineDeviceAmount,
          statusData.untrustedDeviceAmount,
        ],
        backgroundColor: ['#48C864', '#FFCD05', '#FA4C5C'],
        borderWidth: 0,
        cutout: '70%',
      },
    ],
  }
  return (
    <div className="status-container">
      <div className="status-component">
        <Doughnut data={statusComponentData} />
        <div className="status-description-container">
          <div className="status-description">
            <p>
              {statusData.trustedDeviceAmount}/{statusData.totalDeviceAmount}
            </p>
            <p>Trusted</p>
          </div>
        </div>
      </div>
      <p className="status-description-long">
        {statusData.offlineDeviceAmount} offline and{' '}
        {statusData.untrustedDeviceAmount} untrusted devices found
      </p>
    </div>
  )
}

export default StatusComponent
