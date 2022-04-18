import React, {useEffect, useState} from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import {Line} from 'react-chartjs-2'
import {IDevice} from '../../types/deviceType'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface DataGraphProps {
  dataGraphItems: {
    device?: IDevice
  }
}

const DataGraph: React.FC<DataGraphProps> = ({dataGraphItems}) => {
  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: dataGraphItems.device?.name,
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  }

  let labels
  if (dataGraphItems) {
    if (dataGraphItems.device) {
      if (dataGraphItems.device.sensors) {
        labels = dataGraphItems.device?.sensors[0].sensorData?.map((sensor) =>
          new Date(Number(sensor.timestamp) * 1000).toLocaleString('fi-FI')
        )
      }
    }
  }

  let graphData
  if (dataGraphItems) {
    if (dataGraphItems.device) {
      if (dataGraphItems.device.sensors) {
        if (dataGraphItems.device.sensors[0].sensorData) {
          graphData = dataGraphItems.device?.sensors[0].sensorData.map(
            (sensor) => sensor.sensorValue
          )
        }
      }
    }
  }
  const data = {
    labels,
    datasets: [
      {
        label: 'GRAPH',
        data: graphData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y',
      },
    ],
  }

  return <Line options={options} data={data} />
}

export default DataGraph
