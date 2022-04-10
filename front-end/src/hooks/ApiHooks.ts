import {useState, useEffect} from 'react'
import {wsLocalHostUrl, apiUrl} from '../globals/globals'

export const useWebSocket = () => {
  const [data, setData] = useState([''])
  const [connection, setConnection] = useState<WebSocket>()
  const handleData = (newData: string) => {
    setData((data) => {
      return {
        ...data,
        newData,
      }
    })
  }
  useEffect(() => {
    const server = new WebSocket(wsLocalHostUrl)
    setConnection(server)
  }, [])

  if (connection) {
    connection.onerror = (error) => {
      console.log(`WebSocket error: ${error}`)
    }

    connection.onmessage = (e) => {
      handleData(e.data.toString())
    }
  }
  return {data}
}

export const useDevices = () => {
  const [devices, setDevices] = useState([])

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
