// LoRa and Heltec
#include <heltec.h>
#include <LoRa.h>

// Ultrasonic Sensor
#include "E:\SmartFlask\IoT\Heltec Transiever\lib\Ultrasonic_sensor.hpp"

// MPU 6050
#include <Adafruit_MPU6050.h>
#include <Wire.h>

float USDistance;
const long frequency = 915E6;  // LoRa Frequency

//===To Implement After===
// GPS Library
//#include <TinyGPS++.h>
// MPU Library

// Intiatiated Sensor Objects
UltrasonicSensor us_sensor(17, 2);
Adafruit_MPU6050 mpu;
sensors_event_t a, g, temp;

void PrintMPUData()
{
  Serial.print(a.acceleration.x, 1);
  Serial.print(a.acceleration.y, 1);
}

void CompileSensors()
{
  us_sensor.SenseDistance();
  us_sensor.PrintData();
  USDistance = us_sensor.GetDistanceInch();
  //need to do: Compute mpu angle here

  LoRa.println(USDistance);
}

void SendLoRaPacket()
{
  LoRa.beginPacket();
  CompileSensors();
  LoRa.endPacket();
}

void setup()
{
  Serial.begin(9600);

  us_sensor.SetUp();
  mpu.getEvent(&a, &g, &temp);
  


  Heltec.begin(true /*DisplayEnable Enable*/, false /*LoRa Enable*/, false /*Serial Enable*/);

  Serial.println("LoRa Sender starting...");
  if (!LoRa.begin(915E6, 1))
  { // Set frequency to 433, 868 or 915MHz
    Serial.println("Could not find a valid LoRa transceiver, check pins used and wiring!");
  }
  
}

void loop()
{
  us_sensor.SenseDistance();
  us_sensor.PrintData();
  PrintMPUData();
  SendLoRaPacket();
}