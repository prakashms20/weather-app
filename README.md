# weather-app
This Node.js application provides endpoints to fetch the current temperature for Chennai and calculate the Simple Moving Average (SMA) of provided data. It integrates with the Open-Meteo API for weather data and calculates SMA based on input data.
The application will run on http://localhost:3000.
# Third-party api (MetaWeather API)
# Testing
Using Postman
GET /current-temperature:

Method: GET
URL: http://localhost:3000/current-temperature
POST /calculate-sma:

Method: POST
URL: http://localhost:3000/calculate-sma
Body: JSON with data and period.
