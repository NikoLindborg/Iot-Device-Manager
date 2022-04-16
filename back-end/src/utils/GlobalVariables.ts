const host = 'test.mosquitto.org'
const mqttPort = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
const originalTopic = 'ANNOUNCEMENT'
const connectUrl = `mqtt://${host}:${mqttPort}`

export {connectUrl, clientId, originalTopic}
