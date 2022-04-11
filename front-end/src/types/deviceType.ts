import {IDeviceHistory} from './deviceHistoryType'
import {IDeviceSensor} from './deviceSensorType'

export interface IDevice {
  name: string
  trustedState?: number
  channels?: string[]
  history?: IDeviceHistory[]
  sensors?: IDeviceSensor[]
  _id?: Object
}
