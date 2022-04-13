import {IDevice} from '../types/deviceType'
import {useState, useEffect} from 'react'
import {wsLocalHostUrl, apiUrl} from '../globals/globals'

export const useDevices = () => {
  const [devices, setDevices] = useState<IDevice[]>([])
  const [connection, setConnection] = useState<WebSocket>()

  useEffect(() => {
    const server = new WebSocket(wsLocalHostUrl)
    setConnection(server)
  }, [])

  if (connection) {
    connection.onerror = (error) => {
      console.log(`WebSocket error: ${error}`)
    }

    connection.onmessage = (device) => {
      console.log(device)
      const newDevice = JSON.parse(device.data as unknown as string) as IDevice
      console.log('asda', newDevice)
      setDevices([...devices, newDevice])
    }
  }
  useEffect(() => {
    fetchDevices()
  }, [])

  const fetchDevices = async () => {
    const response = await fetch(apiUrl)
    const data = await response.json()
    setDevices(data)
  }

  return {devices}
}
