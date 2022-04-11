import paho.mqtt.client as mqtt
from random import randrange, uniform
import time
import json
from datetime import datetime   

mqttBroker = 'test.mosquitto.org'
client = mqtt.Client("Random_Number")
client.connect(mqttBroker)
MQTT_MSG2=json.dumps({"_id": "d12noiu0", "sensorType": "temperature", "sensorValue": "25", "timestamp": datetime.timestamp(datetime.now())});
MQTT_MSG3=json.dumps({"_id": "d12noiu0", "sensorType": "humidity", "sensorValue": "25", "timestamp": datetime.timestamp(datetime.now())});

client.publish("temperature", MQTT_MSG2)
time.sleep(2)
client.publish("humidity", MQTT_MSG3)
