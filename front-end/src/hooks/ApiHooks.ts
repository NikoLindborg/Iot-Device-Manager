import {INotification} from './../types/notificationType'
import {IChannel} from './../types/channelType'
import {IDevice} from '../types/deviceType'
import {useState, useEffect} from 'react'
import {
  wsLocalHostUrl,
  apiUrl,
  channelUrl,
  notificationUrl,
} from '../globals/globals'

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
      /* Blob error issue number #65
      if (device.data instanceof Blob) {}*/
      console.log(device.data)
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

  const fetchDevice = async (id: string) => {
    const response = await fetch(`${apiUrl}/${id}`)
    const data = await response.json()
    console.log(data)
    return data
  }

  const fetchDeviceData = async (id: string) => {
    const entity = 'sensordata'
    const response = await fetch(`${apiUrl}/${entity}/${id}`)
    return await response.json()
  }

  return {devices, fetchDevice, fetchDeviceData}
}

export const useChannels = () => {
  const [channels, setChannels] = useState<string[]>([])

  useEffect(() => {
    fetchChannels()
  }, [])

  const fetchChannels = async () => {
    const response = await fetch(channelUrl)
    const data = await response.json()
    mapChannelNames(data)
  }

  const mapChannelNames = (data: IChannel[]) => {
    const channelNames = data.map((channel) => channel.name)
    setChannels(channelNames)
  }

  return {channels}
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<INotification[]>()

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    const response = await fetch(notificationUrl)
    const data = await response.json()
    setNotifications(data)
  }

  const deleteNotifications = async () => {
    const response = await fetch(notificationUrl, {method: 'DELETE'})
    const data = await response.json()
    if (data.acknowledged) {
      fetchNotifications()
    }
  }

  const deleteSingleNotification = async (id: string) => {
    const response = await fetch(`${notificationUrl}${id}`, {method: 'DELETE'})
    await response.json()
    fetchNotifications()
  }

  return {notifications, deleteNotifications, deleteSingleNotification}
}
