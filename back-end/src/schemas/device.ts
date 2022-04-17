import {Schema, model} from 'mongoose'
import {IDevice} from '../types/deviceType'

const DeviceSchema = new Schema<IDevice>({
  name: String,
  _id: String,
  trustedState: Number,
  channels: [String],
  history: [
    {
      name: String,
      timestamp: String,
      trustedState: Number,
    },
  ],
  sensors: [
    {
      sensorType: String,
      sensorData: [
        {
          sensorValue: String,
          timestamp: String,
        },
      ],
    },
  ],
})

export const Device = model<IDevice>('Device', DeviceSchema)
