import {ISensorData} from './../../front-end/src/types/sensorDataType'
import {updateChannel} from './controllers/channelController'
import {ifAnnouncements} from './types/announcementType'
import express from 'express'
import 'dotenv/config'
const app = express()
const port = 3001
import mqtt from 'mqtt'
import {connectUrl, clientId, originalTopic} from './utils/GlobalVariables'
import WebSocket from 'ws'
import mongoose from 'mongoose'
import {Device} from './schemas/Device'
import {SubscribedChannel} from './schemas/SubscribedChannel'
import {IDevice} from './types/deviceType'
import connectDB from './config/db'
import {router as deviceRoutes} from './routes/deviceRoutes'
import {router as channelRoutes} from './routes/channelRoutes'
import {getDevices} from './controllers/deviceController'
import WebSocketClient from './websocket/websocket'

const wss = new WebSocket.Server({port: 8080})

wss.on('connection', (ws) => {
  console.log('new client connected')
  ws.on('message', (data) => {
    console.log(`Client has sent us: ${data}`)
  })
  ws.on('close', () => {
    console.log('the client has connected')
  })
  ws.onerror = function () {
    console.log('Some Error occurred')
  }
})
console.log('The WebSocket server is running on port 8080')
const topics = [originalTopic]

connectDB()

app.use('/api/devices', deviceRoutes)
app.use('/api/channels', channelRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: 'emqx',
  password: 'public',
  reconnectPeriod: 1000,
})

client.on('connect', () => {
  console.log('connected')
  client.subscribe([originalTopic], () => {
    console.log(`Subscribe to topic ${originalTopic}`)
  })
})

client.on('message', (topic, payload) => {
  console.log('topiikki', topic, payload.toString())
  if (topic == 'ANNOUNCEMENTS') {
    const message: ifAnnouncements = JSON.parse(payload.toString())
    console.log(message._id)
    Device.find({_id: message._id}, (err, docs) => {
      console.log('error', err, docs)
      if (docs.length == 0) {
        Device.create({
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
        })
      }
    })
    message.channels.forEach((channel) => {
      if(!topics.includes(channel)) {
        topics.push(channel)
        client.subscribe([channel], () => {
          console.log(`Subscribe to topic ${channel}`)
        })
      }

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
    })
    console.log(
      `Received message from topic: asdasda ${topic} reading out: ${message.channels[0]} ${message.channels[1]}`
    )
  } else {
    console.log('topiikki 2', topic)
    const message: ISensorData = JSON.parse(payload.toString())
    Device.findOneAndUpdate(
      {_id: message._id},
      {
        $push: {
          sensors: [
            {
              sensorType: message.sensorType,
              sensorValue: message.sensorValue,
              timestamp: message.timestamp,
            },
          ],
        },
      }, (err, docs) => {
        console.log(docs)
      }
    )
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(payload.toString())
      }
    })
    console.log(
      `Received message from topic: ${topic} reading out: ${payload.toString()}`
    )
  }
})

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`)
})

//testDb()

async function testDb() {
  const testDevice = await Device.create({
    name: 'First Device',
    _id: '123daj9',
    trustedState: 1,
    channels: ['Test Channel'],
    history: [
      {
        name: 'First Device',
        timestamp: 1649248380,
        trustedState: 1,
      },
    ],
    sensors: [
      {
        name: 'Temperature',
        sensorData: [
          {
            sensorValue: 25,
            timestamp: 1649248380,
          },
        ],
      },
    ],
  })

  const testChannels = await SubscribedChannel.create({
    name: 'Test channel',
    devices: testDevice,
  })
}

// Device.find({}).then(result => {
//   result.forEach(device => {
//     console.log(device as IDevice)
//   })
// })
