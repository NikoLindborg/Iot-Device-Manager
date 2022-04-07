"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Device = void 0;
const mongoose_1 = require("mongoose");
const deviceSchema = new mongoose_1.Schema({
    name: String,
    trustedState: Number,
    channels: [String],
    history: [
        {
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
});
exports.Device = (0, mongoose_1.model)('Device', deviceSchema);
//# sourceMappingURL=Device.js.map