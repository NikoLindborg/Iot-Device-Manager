"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3001;
const mqtt_1 = __importDefault(require("mqtt"));
const GlobalVariables_1 = require("./utils/GlobalVariables");
const ws_1 = __importDefault(require("ws"));
const wss = new ws_1.default.Server({ port: 8080 });
const topics = [GlobalVariables_1.originalTopic];
app.get('/', (req, res) => {
    res.send('Hello World!');
});
wss.on('connection', (ws) => {
    console.log('new client connected');
    ws.on('message', (data) => {
        console.log(`Client has sent us: ${data}`);
    });
    ws.on('close', () => {
        console.log('the client has connected');
    });
    ws.onerror = function () {
        console.log('Some Error occurred');
    };
});
console.log('The WebSocket server is running on port 8080');
const client = mqtt_1.default.connect(GlobalVariables_1.connectUrl, {
    clientId: GlobalVariables_1.clientId,
    clean: true,
    connectTimeout: 4000,
    username: 'emqx',
    password: 'public',
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
        wss.clients.forEach((client) => {
            if (client.readyState === ws_1.default.OPEN) {
                client.send(payload.toString());
            }
        });
        console.log(`Received message from topic: ${topic} reading out: ${payload.toString()}`);
    }
});
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map