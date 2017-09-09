import subprocess
import requests
import serial
import pynmea2

ser = serial.Serial(port='/dev/ttyUSB0', baudrate=9600)  # open serial port
print("port opened on " + ser.name)
DeviceName = "NEITHA"
while True:
    subprocess.call('sudo timeout -s INT 6s hcitool lescan > scan.out', shell=True)

    file = open("scan.out", "r")
    scanout = file.read()

    if DeviceName in scanout:
        print("safe")
    else:
        print("stolen")

    posFound = False
    while not posFound:
        line = ser.readline()
        print(line)
        if "GPGGA" in line:
            print(line)
            params = line.split(",")
            lat = params[2]
            long = params[4]
            posFound = True
            ser.flushInput()
            ser.flushOutput()
    res = requests.get(
        "http://box.maxi-muth.de:5000/api/ping?longitude=" + long + "2&latitude=" + lat + "&connected=" + str(
            DeviceName in scanout))
    print res.text
