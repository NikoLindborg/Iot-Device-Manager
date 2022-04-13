import {Device} from '../schemas/Device'
import {SubscribedChannel} from '../schemas/SubscribedChannel'
import {IDeviceSensor} from '../types/deviceSensorType'
import {ISensorData} from '../types/sensorDataType'
import {ifAnnouncements} from './../types/announcementType'
import WebSocket from 'ws'

const announcementService = (
  message: ifAnnouncements,
  topics: string[],
  client: any,
  wss: any
) => {
  Device.find({_id: message._id}, (err, docs) => {
    console.log('error', err, docs)
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
  Device.findOne(
    {_id: message._id, sensorType: message.sensorType},
    (err, docs) => {
      let rightDoc: IDeviceSensor
      docs.sensors.forEach((sensor) => {
        if (sensor.sensorType == message.sensorType) {
          rightDoc = sensor
        }
      })

      if (!rightDoc) {
        docs.sensors.push({
          sensorType: message.sensorType,
          sensorData: [
            {
              sensorValue: message.sensorValue,
              timestamp: message.timestamp,
            },
          ],
        })
      } else {
        rightDoc.sensorData.push({
          sensorValue: message.sensorValue,
          timestamp: message.timestamp,
        })
      }
      docs.save()
    }
  )
}

export {announcementService, sensorService}
