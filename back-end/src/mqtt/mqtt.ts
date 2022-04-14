import {ifAnnouncements} from '../types/announcementType'
import mqtt from 'mqtt'
import {connectUrl, clientId, originalTopic} from '../utils/GlobalVariables'
import {Device} from '../schemas/Device'
import {IDevice} from '../types/deviceType'
import {SubscribedChannel} from '../schemas/SubscribedChannel'
import {getDevices} from '../controllers/deviceController'
import {IDeviceSensor} from '../types/deviceSensorType'
import {ISensorData} from '../types/sensorDataType'
import {updateChannel} from '../controllers/channelController'
import { announcementService, sensorService } from './mqttServices'
import WebSocketClient from '../websocket/websocket'

const mqttClient = () => {
  const {wss} = WebSocketClient()
  const topics = [originalTopic]
  const dbTopics = async () => {
    const fetchedTopics = await SubscribedChannel.find({})
    fetchedTopics.forEach((topic) => {
      topics.push(topic.name)
    })
  }
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
    dbTobics().then(() => {
      topics.forEach((topic) => {
        client.subscribe(topic, () => {
          console.log(`Subscribed to topic ${topic}`)
        })
      })
    })
  })

  client.on('message', (topic, payload) => {
    if (topic == 'ANNOUNCEMENT') {
      try {
        const message: ifAnnouncements = JSON.parse(payload.toString())
        announcementService(message, topics, client, wss)
        console.log(
          `Received message from topic: ${topic} reading out: ${message.channels[0]} ${message.channels[1]}`
        )
      } catch (error) {
        console.error('error occurred trying to read announcements', error)
      }
    } else {
      try {
        const message: ISensorData = JSON.parse(payload.toString())
        sensorService(message)
        console.log(
          `Received message from topic: ${topic} reading out: ${payload.toString()}`
        )
      } catch (error) {
        console.error('error occurred trying to read device info', error)
      }
    }
  })
}

export default mqttClient
