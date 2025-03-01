# Travel App Project

This repository contains the source code for the Travel App Project, a web application that helps users plan trips by providing weather forecasts, location images, and other travel-related information.

📋 Project Summary

The Travel App integrates multiple technologies and APIs to deliver a dynamic user experience. Users can input travel details and receive relevant information through external services. Key technologies include:

Languages: JavaScript, HTML, CSS

Bundler: Webpack

Server: Express.js

APIs: Geonames, WeatherBit, Pixabay

Service Workers: For caching and offline support

🎯 Features

Trip Duration Calculation: Automatically calculates and displays the length of the trip.

Dynamic Image Fetching: Fetches an image of the country if no specific location image is found.

Multi-Day Weather Forecast: Displays weather forecasts for multiple days.

Weather Icons: Shows weather icons alongside the forecast.

Travel Remarks: Users can add notes or comments related to their trip.

Print & Export: Users can print the trip details or export them as a PDF.

Input Validation: Validates required fields, date inputs, and location details.

Processing Indicator: Displays a loading message while processing the request.

Custom Date Format: Presents dates in a user-friendly format.

Close Button: Allows users to close the output pop-up window.

🛠️ Prerequisites

Ensure you have the following installed on your system:

Node.js (v22.13.1 or later)

npm (compatible with Node.js v22.13.1)

🔑 API Credentials

To use the application, you need to obtain API credentials from the following services:

Geonames: Create an account and retrieve your username.

WeatherBit: Sign up to get your API key.

Pixabay: Register to receive your API key.

Environment Setup

Create a .env file in the root directory with the following content, replacing the placeholders with your API credentials:

GEONAMES_USER=your_geonames_username
WEATHERBIT_KEY=your_weatherbit_api_key
PIXABAY_KEY=your_pixabay_api_key

📦 Installation Guide

Follow these steps to set up the project:

Clone the Repository:

git clone https://github.com/ReemaKusa/Travel-app-2/
cd Travel-app-2

Move the .env File:

Ensure the .env file is placed in the root directory of the project.

- Install Dependencies:

npm install

- Run Tests:

npm test

- Check test coverage

npm test -- --coverage

- Build Production Files:

npm run build

- Start the Local Server:

npm start

- Access the Application:

Open your browser and navigate to:

http://localhost:2050/

👤 Author

Reema Kusa