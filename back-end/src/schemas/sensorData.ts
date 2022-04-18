import {Schema, model} from 'mongoose'
import {ISensorData} from '../types/sensorDataType'

const SensorDataSchema = new Schema<ISensorData>({
    deviceId: String,
    sensorValue: String,
    timestamp: String,
    sensorType: String,
})

export const SensorData = model<ISensorData>('Sensor Data', SensorDataSchema)