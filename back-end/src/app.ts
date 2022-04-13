import express from 'express'
import 'dotenv/config'
const app = express()
const port = 3001
import connectDB from './config/db'
import {router as deviceRoutes} from './routes/deviceRoutes'
import {router as channelRoutes} from './routes/channelRoutes'
import WebSocketClient from './websocket/websocket'
import mqttClient from './mqtt/mqtt'

connectDB()

console.log('The WebSocket server is running on port 8080')
const mqtt = mqttClient()

app.use('/api/devices', deviceRoutes)
app.use('/api/channels', channelRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`)
})
