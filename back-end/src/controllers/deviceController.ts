import {Device} from "../schemas/Device"
import { IDevice } from "../types/deviceType"

/** Return list of all the devices from MongoDB */
export const getDevices = async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    try {
        const devices = await Device.find({})
        res.status(200).json(devices)
    } catch (error) {
        console.log(error)
        res.status(400)
    }
}

/** Create a new device to MongoDB */
export const setDevice = async (newDevice: IDevice, req, res) => {
    if (!newDevice) {
        res.status(400)
        throw new Error('No device!')
    }
    try {
        const device = await Device.create({
            name: newDevice.name,
            trustedState: newDevice.trustedState,
            channels: newDevice.channels,
            history: newDevice.history,
            sensors: newDevice.sensors,
        })
        res.status(200).json(device)
    } catch (error) {
        console.log(error)
        res.status(400)
    }
}

/** Update a device in MongoDB by given id */
export const updateDevice = async (updatedDevice: IDevice, req, res) => {
    try {
        const device = await Device.findByIdAndUpdate(req.params.id, updatedDevice, {
            new: true,
        })
        res.status(200).json(device)
    } catch (error) {
        console.log(error)
        res.status(400)
    }
}

/** Delete a device in MongoDB by given id */
export const deleteDevice = async (req, res) => {
    try {
        const device = await Device.findByIdAndDelete(req.params.id)
        res.status(200).json(device)
    } catch (error) {
        console.log(error)
        res.status(400)
    }
}