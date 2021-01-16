from LSM6DS3 import *

Sensor = LSM6DS3()

sx = 0
sy = 0

while True:
	accelerationX = 0
	accelerationY = 0
	millisCurrent = time.time()
	for i in range(0, 10):
		accelerationX += Sensor.getAcceleration('X')*0.1
		accelerationY += Sensor.getAcceleration('Y')*0.1
	timeCurrent = time.time() - millisCurrent
	sx += accelerationX*timeCurrent*timeCurrent/2.0
	sy += accelerationY*timeCurrent*timeCurrent/2.0
	print(math.sqrt(sx*sx+sy*sy)*100)
	print('')
	#file = open('plik.txt')
	#text = file.read()
	#file.close()
	#data = text.split()
	#difference = time.time() - float(data[0])
	#print(difference)
	#print(str(Sensor.getXAccel()))
	#print(str(Sensor.getYAccel()))
	#print(str(Sensor.getZAccel()))
	#print(' ')
	#print(' ')
	#print(' ')
	#print(' ')
	#file = open('plik.txt', 'w')
	#file.write(str(time.time()))
	#file.write(' ')
	#file.write(str(Sensor.getXRotation()))
	#file.write(' ')
	#file.write(str(Sensor.getYRotation()))
	#file.write(' ')
	#file.write(str(Sensor.getZRotation()))
	#file.close()
	#time.sleep(0.1)