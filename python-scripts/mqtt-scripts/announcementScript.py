import paho.mqtt.client as mqtt
from random import randrange, uniform
import time
import json
from datetime import datetime

mqttBroker = 'test.mosquitto.org'
client = mqtt.Client("Random_Number")
client.connect(mqttBroker)
MQTT_MSG=json.dumps({"deviceName": "iotpi006", "_id": "2364d343-5c80-417e-9054-263fcc3f9644", "channels":  ["temperature", "humidity"],  "timestamp": datetime.timestamp(datetime.now())});

randNumber = uniform(1.0,100.0)
client.publish("ANNOUNCEMENT", MQTT_MSG)

