from LSM6DS3 import *
import time

previousTime = 0
angle = 0

Sensor = LSM6DS3()

previousTime = time.time()

while True:
    currentTime = time.time()
    measurment = Sensor.getRawReading('gyro', 'Z')
    if measurment != -1:
        angle += measurment*(currentTime-previousTime)
        print(angle)
    previousTime = currentTime
    #time.sleep(0.1)