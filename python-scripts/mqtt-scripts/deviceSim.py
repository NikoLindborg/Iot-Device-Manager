import paho.mqtt.client as mqtt
from random import randrange, uniform
import time
import json
from datetime import datetime   

mqttBroker = 'test.mosquitto.org'
client = mqtt.Client("Random_Number")
client.connect(mqttBroker)

MQTT_MSG2=json.dumps({"_id": "d21d1324a", "sensorType": "temperatur", "sensorValue": "257", "timestamp": datetime.timestamp(datetime.now())});
MQTT_MSG3=json.dumps({"_id": "d21d1324a", "sensorType": "humidit", "sensorValue": "257", "timestamp": datetime.timestamp(datetime.now())});

client.publish("temperatur", MQTT_MSG2)
time.sleep(2)
client.publish("humidit", MQTT_MSG3)
