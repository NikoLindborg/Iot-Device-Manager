import json
import paho.mqtt.client as mqtt
import time
import json
from datetime import datetime

mqttBroker = 'test.mosquitto.org'
deviceName = 'iotpi003'
client = mqtt.Client('Iot-Device-Manager')
client.connect(mqttBroker, port=1883, bind_address='')

MQTT_MSG=json.dumps({"deviceName": deviceName, "_id": "51454d15-10e4-4917-926b-1b5fef56b1c9", "channels":  ["light", "noise"],  "timestamp": datetime.timestamp(datetime.now()), "disconnect": True});

client.publish('ANNOUNCEMENT', MQTT_MSG)