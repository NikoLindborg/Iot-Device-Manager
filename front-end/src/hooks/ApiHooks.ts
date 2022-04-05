import {useState, useEffect} from 'react'
import {wsLocalHostUrl} from '../globals/globals'

const useWebSocket = () => {
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

export default useWebSocket
