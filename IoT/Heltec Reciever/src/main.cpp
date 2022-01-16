#include "heltec.h"
#include "LoRa.h"
#include "HTTPClient.h"
#include "WiFiMulti.h"
#include "ArduinoJson.h"
#include "Adafruit_Sensor.h"

const char *AP_SSID = "kingdom2";
const char *AP_PWD = "22039622";

String Packet;
float total_water, water_temp, water_consumed, time_tilted, GPS_location;
char flask_name[100];


WiFiMulti wifiMulti;

void LoraRecieve()
{
  // try to parse packet
  // int packetSize = LoRa.parsePacket();

  if (LoRa.available())
  {
    Serial.println("Packet Received: ");
    Packet = LoRa.readString();
  }

  Serial.println(Packet);
  sscanf(Packet.c_str(), "%f\n%f\n%f\n%f\n%f\n%[^&]\n", &total_water, &water_temp, &water_consumed, &time_tilted, &GPS_location, flask_name);
  delay(10000);
}

void postDataToServer()
{

  Serial.println("Posting JSON data to server...");
  // Block until we are able to connect to the WiFi access point
  if (wifiMulti.run() == WL_CONNECTED)
  {

    HTTPClient http;
    http.begin("http://20.69.111.104:5000/iot");
    http.addHeader("Content-Type", "application/json");

    StaticJsonDocument<200> doc;
    // Add values in the document

    // doc["name"] = "ESP32";
    // doc["temperature"] = temperature;
    // doc["humidity"] = humidity;
    // doc["longitude"] = longitude;
    // doc["latitude"] = latitude;
    // doc["smoke"] = smoke;

    doc["water_level"] = total_water;
    doc["water_temperature"] = water_temp;
    doc["water_consumed"] = water_consumed;
    doc["time_tilted"] = time_tilted;
    doc["flask_gps"] = GPS_location;
    doc["flask_name"] = flask_name;

    String requestBody;
    serializeJson(doc, requestBody);

    int httpResponseCode = http.POST(requestBody);

    if (httpResponseCode > 0)
    {

      String response = http.getString();

      Serial.println(httpResponseCode);
      Serial.println(response);
    }
    else
    {

      // Serial.printf("Error occurred while sending HTTP POST: %s\n", http.errorToString(statusCode).c_str());
    }
  }
}

void setup()
{
  Serial.begin(9600);
  while (!Serial);

  Heltec.begin(true /*DisplayEnable Enable*/, false /*LoRa Enable*/, false /*Serial Enable*/);
  Serial.println("LoRa Receiver");

  if (!LoRa.begin(915E6, 1))
  {
    Serial.println("Starting LoRa failed!");
    while (1);
  }

  wifiMulti.addAP(AP_SSID, AP_PWD);
}

void loop()
{
  LoraRecieve();
  postDataToServer();
}