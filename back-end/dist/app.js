"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
const mqtt_1 = __importDefault(require("mqtt"));
const GlobalVariables_1 = require("./utils/GlobalVariables");
const topics = [GlobalVariables_1.originalTopic];
app.get('/', (req, res) => {
    res.send('Hello World!');
});
const client = mqtt_1.default.connect(GlobalVariables_1.connectUrl, {
    clientId: GlobalVariables_1.clientId,
    clean: true,
    connectTimeout: 4000,
    reconnectPeriod: 1000,
});
client.on('connect', () => {
    console.log('connected');
    client.subscribe([GlobalVariables_1.originalTopic], () => {
        console.log(`Subscribe to topic ${GlobalVariables_1.originalTopic}`);
    });
});
client.on('message', (topic, payload) => {
    console.log(topic);
    if (topic == 'ANNOUNCEMENTS') {
        const message = JSON.parse(payload.toString());
        const channels = message.channels.split(', ');
        channels.forEach((channel) => {
            if (!topics.includes(channel)) {
                client.subscribe([channel], () => {
                    console.log(`Subscribe to topic ${channel}`);
                });
                topics.push(channel);
            }
        });
        console.log(`Received message from topic: ${topic} reading out: ${channels[0]} ${channels[1]}`);
    }
    else {
        console.log(`Received message from topic: ${topic} reading out: ${payload.toString()}`);
    }
});
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map
