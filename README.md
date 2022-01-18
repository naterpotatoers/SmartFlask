# SmartFlask
For CruzHacks 2022
By Adrian, Adrien, Nate, Weston
<br/>
![Logo](https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/001/797/208/datas/original.png)

A IoT bottle that tracks water consumption. Winner of Best Health Hack, MLH's Best Hardware Hack, and QB3's Best Big Data for the Improvement of Health Care Winner at CruzHacks 2022.
<br/>
[Plan of Reference Document](https://docs.google.com/presentation/d/102n18cPRJnqRSowYpp3QLn0Yix3CWpKABw2xC8X9vEw/edit?usp=sharing)
<br/>
[YouTube Video](https://www.youtube.com/watch?v=BKwhg2OnEeA)

# Inspiration
Wanted a way to monitor how much water we consumed throughout our day and over a month period

# What it does
The SmartFlask measures the amount of water in a water bottle and the amount you've consumed over time. It then transmits a radio signal to a receiver and posts it to a web server where the data is saved to a database for you to view it later in the web browser.

# How we built it
![Hardware](https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/001/797/212/datas/original.jpg)
![3D Model](https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/001/797/255/datas/original.png)

We built this device using a Heltec ESP32 for the main computation, a LoRa module for transmission of data, an ultrasonic sensor for monitoring the distance of the water in the bottle, an IMU to measure the movement of the water bottle, a GPS module so you don't lose your water bottle and a power system. On the software side we built out the webserver using Node.js and MySQL. We create the user interface using Next.js and vanilla CSS.

# Challenges we ran into
On the hardware side we ran into problems parsing data, power management, water/IMU calculation, and creating the 3D printed lid. On the software side we had trouble building out the user interface as this was something none of us were really experienced in. We also tried deploying our application using Google's Kubernete Engine service with no luck. We also attempted to automate the deployment to Kubernetes using GitHub Actions as apart of our CI/CD build pipeline with no luck.

# Accomplishments that we're proud of
Successfully calculating the amount of water in the bottle using a depth sensor. 3D printing the housing unit for the water bottle. Creating unique SQL queries that were a bit complex for our leaderboard feature.

# What we learned
The difficulty of working with new software tools that we are unfamiliar with. How to work together as a team and find the necessary tasks to build and execute a full system of hardware, embedded, and web development. The importance of setting realistic goals.

# What's next for SmartFlask
We plan to continue working on this project and redesigning the top as we did not have time to 3D print the design we wanted. Further refining the user interface and building out more useful graphs.

![Bottle](https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/001/797/210/datas/original.jpg)

Built With
c++
css
express.js
google
mysql
nextjs
node.js
platformio
typescript
<br/>
[Full Project on Devpost](https://devpost.com/software/smartflask)
