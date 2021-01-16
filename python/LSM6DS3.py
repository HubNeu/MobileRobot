import Adafruit_GPIO.I2C as I2C

g = 9.8126

address = dict()
address['IMU'] = 0x6A
address['enable_accel'] = 0x10
address['enable_gyro'] = 0x11
address['enable_accuracy'] = 0x12
address['accelX'] = 0x28
address['accelY'] = 0x2A
address['accelZ'] = 0x2C
address['gyroX'] = 0x22
address['gyroY'] = 0x24
address['gyroZ'] = 0x26

factor = dict()
factor['accelX-'] = 16706/g
factor['accelX+'] = 16705/g
factor['accelY-'] = 16963/g
factor['accelY+'] = 16191/g
factor['accelZ-'] = 16963/g
factor['accelZ+'] = 16705/g
factor['gyroX-'] = 1
factor['gyroX+'] = 1
factor['gyroY-'] = 1
factor['gyroY+'] = 1
factor['gyroZ-'] = 109.24
factor['gyroZ+'] = 109.675

class LSM6DS3:
    def __init__(self):
        self.i2c = I2C.get_i2c_device(address['IMU'])
        self.i2c.write8(address['enable_accuracy'], address['enable_accuracy'])

    def getRawReading(self, sensor, axis):
        gauge = sensor + axis
        enable = address['enable_' + sensor]
        self.i2c.write8(enable, enable)
        reading = self.i2c.readS16(address[gauge])
        if reading > 0:
            reading /= factor[gauge + '+']
        else:
            reading /= factor[gauge + '-']
        return reading