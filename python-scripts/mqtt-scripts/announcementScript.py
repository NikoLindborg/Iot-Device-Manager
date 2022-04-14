import paho.mqtt.client as mqtt
from random import randrange, uniform
import time
import json
from datetime import datetime

mqttBroker = 'test.mosquitto.org'
client = mqtt.Client("Random_Number")
client.connect(mqttBroker)
MQTT_MSG=json.dumps({"deviceName": "Rasberto", "_id": "cesacse33", "channels":  ["noise", "humidity"],  "timestamp": datetime.timestamp(datetime.now())});

randNumber = uniform(1.0,100.0)
client.publish("ANNOUNCEMENT", MQTT_MSG)

