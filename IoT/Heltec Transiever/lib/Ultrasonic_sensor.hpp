#pragma once
#include <Arduino.h>

class UltrasonicSensor
{

private:
#define SOUND_SPEED 0.034
#define CM_TO_INCH 0.393701

    int trigPin_;
    int echoPin_;
    long duration;
    float distanceCm;
    float distanceInch;
    int print_count;

public:
    UltrasonicSensor(int trigPin, int echoPin)
    {
        trigPin_ = trigPin;
        echoPin_ = echoPin;
    }

    int getTrigPin()
    {
        return trigPin_;
    }

    int getEchoPin()
    {
        return echoPin_;
    }
    // define sound speed in cm/uS

    float GetDistanceInch()
    {
        return distanceInch;
    }

    float GetDistanceCM()
    {
        return distanceCm;
    }

    void SetUp()
    {
        pinMode(trigPin_, OUTPUT); // Sets the trigPin as an Output
        pinMode(echoPin_, INPUT);  // Sets the echoPin as an Input
    }

    void SenseDistance()
    {
        // Clears the trigPin
        digitalWrite(trigPin_, LOW);
        delayMicroseconds(2);
        // Sets the trigPin on HIGH state for 10 micro seconds
        digitalWrite(trigPin_, HIGH);
        delayMicroseconds(10);
        digitalWrite(trigPin_, LOW);

        // Reads the echoPin, returns the sound wave travel time in microseconds
        duration = pulseIn(echoPin_, HIGH);
        // Calculate the distance
        distanceCm = duration * SOUND_SPEED / 2;
        // Convert to inches
        distanceInch = distanceCm * CM_TO_INCH;
    }

    void PrintData()
    {
        // Prints the distance in the Serial Monitor
        Serial.println("Print Count: " + String(print_count));
        Serial.print("Distance (cm): ");
        Serial.println(distanceCm);
        print_count++;
    }
};