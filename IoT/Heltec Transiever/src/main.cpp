// LoRa and Heltec
#include <heltec.h>
#include <LoRa.h>
#include "E:\SmartFlask\IoT\Heltec Transiever\lib\Ultrasonic_sensor.hpp"


//===To Implement After===
// GPS Library
//#include <TinyGPS++.h>
// MPU Library
//#include <Adafruit_MPU6050.h>
//#include <Wire.h>

//Intiatiated Sensor Objects
UltrasonicSensor us_sensor(17, 2);

void setup() {
  Serial.begin(9600);
  us_sensor.SetUp();
  // put your setup code here, to run once:
}

void loop() {
  us_sensor.SenseDistance();
  us_sensor.PrintData();
  // put your main code here, to run repeatedly:
}