#include <algorithm>
#include <bits/stdc++.h>
// LoRa and Heltec
#include <heltec.h>
#include <LoRa.h>

// Ultrasonic Sensor
#include "/home/adrien/Repos/SmartFlask/IoT/Heltec Transiever/lib/Ultrasonic_sensor.hpp"

// MPU 6050
#include <Adafruit_MPU6050.h>
#include <Wire.h>

float USDistance;
const long frequency = 915E6; // LoRa Frequency
float previous_distance = 0;
float current_distance;
float amount_drank = 0;
int deviation = 2;

//===To Implement After===
// GPS Library
//#include <TinyGPS++.h>
// MPU Library

// Intiatiated Sensor Objects
UltrasonicSensor us_sensor(17, 2);
Adafruit_MPU6050 mpu;
sensors_event_t a, g, temp;

float PrintMPUData()
{
  Serial.print(a.acceleration.x, 1);
  Serial.print(a.acceleration.y, 1);
  return 0;
}

void AmountDrank()
{
    if (amount_drank < 15 && amount_drank > 0){
    current_distance = us_sensor.GetDistanceInch();
    if (current_distance > previous_distance)
    {
      amount_drank += current_distance - previous_distance;
      previous_distance = current_distance;
    } else if (current_distance < previous_distance){
      amount_drank -= current_distance;
    }

    Serial.println("Amount Consumed: " + String(amount_drank) + "\n");
    }
  }

void SensorTesting()
{
  us_sensor.SenseDistance();
  us_sensor.PrintData();
  AmountDrank();

  // printf("MPU Data: %f", PrintMPUData());
}

void CompileSensors()
{
  SensorTesting();
  // need to do: Compute mpu angle
  // LoRa.println(AmountDrank());
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
  SendLoRaPacket();
}