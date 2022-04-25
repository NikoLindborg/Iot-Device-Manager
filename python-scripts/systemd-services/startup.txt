//file = iotmgrstart.sh location= /home/iot-device-manager/iotmgrstart.sh
 
 pwd
 which python3
 python3 /home/pi/iot-device-manager/announcementScript.py
 sleep 2
 python3 /home/pi/iot-device-manager/sensorScript.py &
