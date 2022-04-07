import {Schema, model} from "mongoose"
import {IDevice} from "../types/deviceType"

const deviceSchema = new Schema<IDevice>({
    name: String,
    trustedState: Number,
    channels: [String],
    history: [
        {
            name: String,
            timestamp: Number,
            trustedState: Number,
        },
    ],
    sensors: [
        {
            name: String,
            sensorData: [
                {
                    sensorValue: {},
                    timestamp: Number,
                },
            ],
        },
    ],
})

export const Device = model<IDevice>('Device', deviceSchema)