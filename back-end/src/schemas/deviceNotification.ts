import {Schema, model} from 'mongoose'
import { IDeviceNotification } from '../types/deviceNotificationType'

const DeviceNotificationSchema = new Schema<IDeviceNotification>({
  deviceId: String,
  deviceName: String,
  deviceChannels: [String],
  timestamp: String,
  title: String,
})

export const DeviceNotification = model<IDeviceNotification>('Device Notification', DeviceNotificationSchema)
