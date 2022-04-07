import { ISensorData } from "./sensorDataType";

export interface IDeviceSensor {
    name: string,
    sensorData?: ISensorData[],
    _id?: Object
}