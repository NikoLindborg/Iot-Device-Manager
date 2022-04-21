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
import {useDevices} from '../../hooks/ApiHooks'

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
    selectedData?: string
    id?: string
  }
}

const DataGraph: React.FC<DataGraphProps> = ({dataGraphItems}) => {
  const {fetchDeviceData} = useDevices()
  const [deviceData, setDeviceData] = useState<ISensorData[]>([])

  useEffect(() => {
    const fetch = async () => {
      try {
        if (dataGraphItems.id) {
          const fetchedDeviceData = await fetchDeviceData(dataGraphItems.id)
          setDeviceData(fetchedDeviceData)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetch()
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
        text: 'Data Graph',
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

  const getGraphData = (sensorName?: String) => {
    if (deviceData) {
      const graphData = deviceData.map((sensor) => {
        if (sensor.sensorType == sensorName) {
          console.log('iffiss', sensor.sensorValue)
          return sensor.sensorValue
        }
      })
      console.log(graphData)
      return graphData
    } else {
      console.log('get graph data failed')
    }
  }

  const getGraphDataLabels = (sensorName?: String) => {
    if (deviceData) {
      const graphDataLabels = deviceData.map((sensor) => {
        if (sensor.sensorType == sensorName) {
          return new Date(Number(sensor.timestamp) * 1000).toLocaleString(
            'fi-FI'
          )
        }
      })
      console.log('grhlabels', graphDataLabels)
      return graphDataLabels
    } else {
      console.log('get graph data labels failed')
    }
  }

  const labels = getGraphDataLabels(dataGraphItems.selectedData)

  const data = {
    labels,
    datasets: [
      {
        label: dataGraphItems.selectedData,
        data: getGraphData(dataGraphItems.selectedData),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y',
      },
    ],
  }

  useEffect(() => {
    getGraphDataLabels()
  }, [data])

  return <Line options={options} data={data} />
}

export default DataGraph
