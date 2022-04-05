import {ifAnnouncements} from './types/announcementType'
import express from 'express'
const app = express()
const port = 3001
import mqtt from 'mqtt'
import {connectUrl, clientId, originalTopic} from './utils/GlobalVariables'
import WebSocket from 'ws'
const wss = new WebSocket.Server({port: 8080})
const topics = [originalTopic]

app.get('/', (req, res) => {
  res.send('Hello World!')
})

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
  console.log(topic)
  if (topic == 'ANNOUNCEMENTS') {
    const message: ifAnnouncements = JSON.parse(payload.toString())
    const channels = message.channels.split(', ')
    channels.forEach((channel) => {
      if (!topics.includes(channel)) {
        client.subscribe([channel], () => {
          console.log(`Subscribe to topic ${channel}`)
        })
        topics.push(channel)
      }
    })
    console.log(
      `Received message from topic: ${topic} reading out: ${channels[0]} ${channels[1]}`
    )
  } else {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(payload.toString());
      }
    });
    console.log(
      `Received message from topic: ${topic} reading out: ${payload.toString()}`
    )
  }
})

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`)
})
