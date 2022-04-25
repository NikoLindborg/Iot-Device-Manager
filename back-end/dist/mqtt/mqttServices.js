"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sensorService = exports.announcementService = void 0;
const Device_1 = require("../schemas/Device");
const SubscribedChannel_1 = require("../schemas/SubscribedChannel");
const ws_1 = __importDefault(require("ws"));
const sensorData_1 = require("../schemas/sensorData");
const announcementService = (message, topics, client, wss) => {
    Device_1.Device.find({ _id: message._id }, (err, docs) => {
        console.log('error', err, docs);
        if (docs.length == 0) {
            Device_1.Device.create({
                name: message.deviceName,
                _id: message._id,
                trustedState: 1,
                channels: message.channels,
                history: [
                    {
                        name: message.deviceName,
                        timestamp: message.timestamp,
                        trustedState: 1,
                    },
                ],
            }, (err, docs) => {
                wss.clients.forEach((client) => {
                    if (client.readyState === ws_1.default.OPEN) {
                        console.log('SENT MESSAGE');
                        client.send(JSON.stringify(docs));
                    }
                });
            });
        }
    });
    message.channels.forEach((channel) => {
        if (!topics.includes(channel)) {
            topics.push(channel);
            client.subscribe([channel], () => {
                console.log(`Subscribe to topic ${channel}`);
            });
            SubscribedChannel_1.SubscribedChannel.findOneAndUpdate({ name: channel }, { $push: { devices: message._id } }, (err, docs) => {
                if (!docs) {
                    SubscribedChannel_1.SubscribedChannel.create({
                        name: channel,
                        devices: message._id,
                    });
                }
                else {
                    console.log(docs);
                }
            });
        }
    });
};
exports.announcementService = announcementService;
const sensorService = (message) => {
    sensorData_1.SensorData.create({
        deviceId: message._id,
        sensorValue: message.sensorValue,
        timestamp: message.timestamp,
        sensorType: message.sensorType,
    });
};
exports.sensorService = sensorService;
//# sourceMappingURL=mqttServices.js.map