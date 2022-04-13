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

const graphData: {dataType: string; dataList: string[]}[] = [
  {dataType: 'Humidity', dataList: ['25', '22', '24', '20', '21', '11']},
]

const DataGraph: React.FC<DataGraphProps> = ({dataGraphItems}) => {
  useEffect(() => {
    const test = () => {
      try {
        dataGraphItems.device?.sensors?.map((sensor) => {
          sensor.sensorData?.map((sensorData) => {
            console.log('timestamp', sensorData.timestamp)
          })
        })
      } catch (error) {
        console.log(error)
      }
    }
    test()
  }, [])

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

  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ]

  const data = {
    labels,
    datasets: [
      {
        label: graphData[0].dataType,
        data: graphData[0].dataList,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y',
      },
    ],
  }

  return <Line options={options} data={data} />
}

export default DataGraph
