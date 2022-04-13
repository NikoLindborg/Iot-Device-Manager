import {ISensorData} from './sensorDataType'

export interface IDeviceSensor {
  sensorType: string
  sensorData?: ISensorData[]
  _id?: Object
}
