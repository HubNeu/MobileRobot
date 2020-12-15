from LSM6DS3 import *

enable = 'enable'
access = 'enable'
sensor = LSM6DS3()

while enable != 'disable':
    if access == 'enable':
        file = open('orientation.txt', 'w')
        file.write(str(sensor.getRawReading('accel', 'X')))
        file.write(' ')
        file.write(str(sensor.getRawReading('accel', 'Y')))
        file.write(' ')
        file.write(str(sensor.getRawReading('accel', 'Z')))
        file.close()
    file = open('config.txt')
    data = file.read()
    file.close()
    if data == 'enable enable':
        access = 'enable'
    elif data == 'enable disable':
        access = 'disable'
    elif data == 'disable disable':
        enable = 'disable'
        