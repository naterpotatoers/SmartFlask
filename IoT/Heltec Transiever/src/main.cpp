#include <math.h>
#include <Arduino.h>
#include <algorithm>
#include <bits/stdc++.h>

// LoRa and Heltec
#include <heltec.h>
#include <LoRa.h>

// GPS Module
#include <TinyGPS++.h>
#include <SoftwareSerial.h>

// Ultrasonic Sensor
#include "E:\SmartFlask\IoT\Heltec Transiever\lib\Ultrasonic_sensor.hpp"

// MPU 6050
#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>
#include <Wire.h>

const long frequency = 915E6; // LoRa Frequency
float bottle_depth = 27;
float water_height = 0.0;
float bottle_radius = 7;
float volume_amount = 0.0;
float current_water_amount = 0.0;
float max_water = 3800.0;
float amount_consumed = 0.0;
String flask_name = "FlaskyWasky";
String gps_string;

UltrasonicSensor us_sensor(12, 13);

// GPS
double Lon, Lat;
TinyGPSPlus gps;
static const int RXPin = 17, TXPin = 2;
static const uint32_t GPSBaud = 9600;

Adafruit_MPU6050 mpu;
sensors_event_t a, g, temp;

String GetGPS()
{
  while (Serial2.available())
  {
    gps.encode(Serial2.read());
    if (gps.location.isUpdated())
    {

      Lat = gps.location.lat();
      Lon = gps.location.lng();
      gps_string = (String)Lat + "," + (String)Lon;
      // delay(3000);
    }
  }
  return gps_string;
}

float GetAccel()
{
  // Under Construction
  Serial.print(a.acceleration.x, 1);
  Serial.print(a.acceleration.y, 1);
  return 0.0;
}

float GetWaterTemp()
{
  return temp.temperature;
}

float GetCurrentDistance()
{
  return us_sensor.GetDistanceCM();
}

float AmountOfWater()
{
  water_height = bottle_depth - GetCurrentDistance();
  volume_amount = M_PI * (bottle_radius * bottle_radius) * water_height;
  if (volume_amount <= 0)
  {
    volume_amount = 0;
  }
  return volume_amount;
}

float AmountDrank()
{
  amount_consumed = max_water - AmountOfWater();
  if (amount_consumed <= 0)
  {
    amount_consumed = 0;
  }
  return amount_consumed;
}

void GetSensors()
{
  // UL sensor data output
  us_sensor.SenseDistance();
  us_sensor.PrintData();
  Serial.println("Amount of Water: " + String(AmountOfWater()) + "mL");
  Serial.println("Amount Consumed: " + String(AmountDrank()) + "mL\n");
  Serial.print("\nLatitude: " + (String)Lat + "\nLongitude: " + (String)Lon + "\n");
  // GPS
  // GetGPS();

  // MPU
}

void CompileSensors()
{
  // time_tilted, GPS_location;
  GetSensors();
  // need to do: Compute mpu angle
  LoRa.println(AmountOfWater());
  LoRa.println(GetWaterTemp());
  LoRa.println(AmountDrank());
  LoRa.println(5); // time_tilted IMU
  LoRa.println(GetGPS());
  LoRa.println(flask_name);
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
  Serial2.begin(GPSBaud, SERIAL_8N1, RXPin, TXPin);

  // if (!mpu.begin())
  // {
  //   Serial.println("Failed to find MPU6050 chip");
  //   while (1)
  //   {
  //     delay(10);
  //   }
  // }

  Serial.println("MPU6050 Found!");

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
  delay(3000);
}