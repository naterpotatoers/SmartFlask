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
float amount_drank = 0.0;
float bottle_depth = 11.5;
float water_height = 0.0;
float bottle_diameter = 5.1;
float volume_amount = 0.0;
float current_water_amount = 0.0;
float previous_water_amount = 11.5;
String flask_name = "FlaskyWasky";
String gps_string;

UltrasonicSensor us_sensor(24, 5);

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
      //delay(3000);
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

void GetSensors()
{
  //UL sensor data output
  us_sensor.SenseDistance();
  us_sensor.PrintData();
  Serial.println("Amount Consumed: " + String(AmountDrank()) + "mL\n");
  Serial.print("\nLatitude: " + (String)Lat + "\nLongitude: " + (String)Lon + "\n");
    // GPS
  //GetGPS();

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
  LoRa.println(); // time_tilted IMU
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
  Serial2.begin(GPSBaud, SERIAL_8N1,RXPin,TXPin);

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