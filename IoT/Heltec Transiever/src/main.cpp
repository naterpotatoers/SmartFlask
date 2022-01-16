#include <math.h>
#include <Arduino.h>
#include <algorithm>
#include <bits/stdc++.h>
// LoRa and Heltec
#include <heltec.h>
#include <LoRa.h>

// Ultrasonic Sensor
#include "E:\SmartFlask\IoT\Heltec Transiever\lib\Ultrasonic_sensor.hpp"

// MPU 6050
#include <Adafruit_MPU6050.h>
#include <Wire.h>

const long frequency    = 915E6; // LoRa Frequency
float amount_drank      = 0;
float bottle_depth      = 11.5;
float water_height;
float bottle_diameter   = 5.1;
float volume_amount;

int current_water_amount = 0;
int previous_water_amount = 11.5;

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

float GetCurrentDistance()
{
  return us_sensor.GetDistanceCM();
}

float AmountOfWater()
{
  water_height = bottle_depth - GetCurrentDistance();
  volume_amount = M_PI * bottle_diameter * water_height;
  return volume_amount;
}

float AmountDrank()
{
  if (current_water_amount >= 0 || current_water_amount <= bottle_depth)
  {
    current_water_amount = AmountOfWater();
    if (current_water_amount < previous_water_amount)
    {
      amount_drank = previous_water_amount - current_water_amount;
      current_water_amount = previous_water_amount;
    }
  }
  return amount_drank;
}

void SensorTesting()
{
  us_sensor.SenseDistance();
  us_sensor.PrintData();
  Serial.println("Amount Consumed: " + String(AmountDrank()) + "mL\n");

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