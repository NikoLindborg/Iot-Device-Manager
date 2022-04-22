import {DeviceNotification} from './../schemas/DeviceNotification';
import {Device} from '../schemas/Device'
import {SubscribedChannel} from '../schemas/SubscribedChannel'
import {ISensorData} from '../types/sensorDataType'
import {ifAnnouncements} from './../types/announcementType'
import WebSocket from 'ws'
import { SensorData } from '../schemas/sensorData'

const announcementService = (
  message: ifAnnouncements,
  topics: string[],
  client: any,
  wss: any
) => {
  Device.find({_id: message._id}, (err, docs) => {
    if (docs.length == 0) {
      Device.create(
        {
          name: message.deviceName,
          _id: message._id,
          trustedState: 1,
          channels: message.channels,
          history: [
            {
              name: message.deviceName,
              timestamp: message.timestamp,
              trustedState: 1,
            },
          ],
        },
        (err, docs) => {
          wss.clients.forEach((client) => {

            if (client.readyState === WebSocket.OPEN) {
              console.log('SENT MESSAGE')
              client.send(JSON.stringify(docs))
            }
          })
        }
      )
      DeviceNotification.create(
        {
          deviceId: message._id,
          deviceName: message.deviceName,
          deviceChannels: message.channels,
          timestamp: message.timestamp,
          title: `Device ${message.deviceName} connected`
        }
      )
    }
  })
  message.channels.forEach((channel) => {
    if (!topics.includes(channel)) {
      topics.push(channel)
      client.subscribe([channel], () => {
        console.log(`Subscribe to topic ${channel}`)
      })

      SubscribedChannel.findOneAndUpdate(
        {name: channel},
        {$push: {devices: message._id}},
        (err, docs) => {
          if (!docs) {
            SubscribedChannel.create({
              name: channel,
              devices: message._id,
            })
          } else {
            console.log(docs)
          }
        }
      )
    }
  })
}

const sensorService = (message: ISensorData) => {
  SensorData.create({
    deviceId: message._id,
    sensorValue: message.sensorValue,
    timestamp: message.timestamp,
    sensorType: message.sensorType,
  })
}

export {announcementService, sensorService}
