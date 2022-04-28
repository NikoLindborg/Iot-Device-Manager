import express from 'express'
import 'dotenv/config'
import cors from 'cors'
const app = express()
const port = 3001
import connectDB from './config/db'
import {router as deviceRoutes} from './routes/deviceRoutes'
import {router as channelRoutes} from './routes/channelRoutes'
import {router as deviceNotificationRoutes} from './routes/deviceNotificationRoutes'

import mqttClient from './mqtt/mqtt'

connectDB()

console.log('The WebSocket server is running on port 8080')
mqttClient()

app.use(cors())
app.use('/api/devices', deviceRoutes)
app.use('/api/channels', channelRoutes)
app.use('/api/notifications', deviceNotificationRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`)
})
