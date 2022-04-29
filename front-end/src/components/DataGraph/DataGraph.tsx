/* eslint-disable indent */
/* eslint-disable operator-linebreak */
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
    selectedData?: string
    id?: string
    device?: IDevice
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
        console.log(data.datasets)
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

  const getGraphData = (chosenData?: String) => {
    if (dataGraphItems.device) {
      if (
        chosenData == 'attestation history' &&
        dataGraphItems.device.history
      ) {
        const graphData = dataGraphItems.device.history.map((history) => {
          return history.trustedState
        })
        return graphData
      }
    }

    if (deviceData) {
      const graphData = deviceData.map((sensor) => {
        if (sensor.sensorType == chosenData) {
          return sensor.sensorValue
        }
      })
      console.log(graphData)
      return graphData
    } else {
      console.log('get graph data failed')
    }
  }

  const getGraphDataLabels = (chosenData?: String) => {
    if (dataGraphItems.device) {
      if (
        chosenData == 'attestation history' &&
        dataGraphItems.device.history
      ) {
        const graphDataLabels = dataGraphItems.device.history.map((history) => {
          return new Date(Number(history.timestamp) * 1000).toLocaleString(
            'fi-FI'
          )
        })
        return graphDataLabels
      }
    }

    if (deviceData) {
      const graphDataLabels = deviceData.map((sensor) => {
        if (sensor.sensorType == chosenData) {
          return new Date(Number(sensor.timestamp) * 1000).toLocaleString(
            'fi-FI'
          )
        }
      })
      return graphDataLabels
    } else {
      console.log('get graph data labels failed')
    }
  }

  const labels = getGraphDataLabels(dataGraphItems.selectedData)

  const skipped = (ctx: any, value: any) =>
    ctx.p0.skip || ctx.p1.skip ? value : undefined
  const down = (ctx: any, value: any) =>
    ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined
  const up = (ctx: any, value: any) =>
    ctx.p0.parsed.y < ctx.p1.parsed.y ? value : undefined

  const trusted = (ctx: any, value: string) => {
    if (dataGraphItems.selectedData == 'attestation history') {
      console.log(ctx.p0.parsed.y == 0)
      console.log(ctx.p0.parsed.y)
      if (ctx.p0.parsed.y == 0 && ctx.p0.parsed.y == ctx.p1.parsed.y) {
        return value
      }
      if (down(ctx, value) && ctx.p1.parsed.y == 0) {
        return value
      }
      return undefined
    }
  }

  const untrusted = (ctx: any, value: string) => {
    if (dataGraphItems.selectedData == 'attestation history') {
      console.log(ctx.p0.parsed.y == 0)
      console.log(ctx.p0.parsed.y)
      if (ctx.p0.parsed.y > 2 && ctx.p0.parsed.y == ctx.p1.parsed.y) {
        return value
      }
      if (up(ctx, value) && ctx.p1.parsed.y > 2) {
        return value
      }
      return undefined
    }
  }

  const offline = (ctx: any, value: string) => {
    return ctx.p0.parsed.y == 2 && ctx.p0.parsed.y == ctx.p1.parsed.y
      ? value
      : undefined
  }

  const data = {
    labels,
    datasets: [
      {
        label: dataGraphItems.selectedData,
        data: getGraphData(dataGraphItems.selectedData),
        spanGaps: true,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y',
        segment: {
          borderColor: (ctx: any) =>
            skipped(ctx, 'rgb(0,0,0,0.2)') ||
            trusted(ctx, 'rgb(72, 200, 100)') ||
            untrusted(ctx, 'rgb(255, 205, 5)') ||
            offline(ctx, 'rgb(255, 99, 132)'),
          borderDash: (ctx: any) => skipped(ctx, [6, 6]),
        },
      },
    ],
  }

  return <Line options={options} data={data} />
}

export default DataGraph
