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
import {ISensorData} from '../../types/sensorDataType'

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
    deviceData?: ISensorData
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
        text: 'test',
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

  const labels = ['ha', 'haa']

  if (dataGraphItems) {
    if (dataGraphItems.deviceData) {
      console.log('haha', dataGraphItems.deviceData.sensorType)
    } else {
      console.log('hahaa')
    }
  }

  const graphData = ['21', '22']

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
