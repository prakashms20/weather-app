const express = require('express');
const axios = require('axios');
const { calculateSMA } = require('./sma');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const CHENNAI_LAT = '13.0827';
const CHENNAI_LON = '80.2707';

// Endpoint to get Chennai's current temperature using Open-Meteo
app.get('/current-temperature', async (req, res) => {
    try {
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${CHENNAI_LAT}&longitude=${CHENNAI_LON}&current_weather=true`;
        const response = await axios.get(weatherUrl);
        const temperature = response.data.current_weather.temperature;
        const timestamp = new Date().toISOString();
        res.json({ temperature, timestamp });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error fetching weather data' });
    }
});

// Endpoint to calculate SMA and return it with Chennai's current temperature
app.post('/calculate-sma', async (req, res) => {
    const { data, period } = req.body;
    if (!data || !period || data.length < period) {
        return res.status(400).json({ error: 'Invalid data or period' });
    }

    try {
        // Calculate SMA
        const smaResult = calculateSMA(data, period);

        // Fetch Chennai's current temperature
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${CHENNAI_LAT}&longitude=${CHENNAI_LON}&current_weather=true`;
        const response = await axios.get(weatherUrl);
        const temperature = response.data.current_weather.temperature;
        const timestamp = new Date().toISOString();

        // Return SMA result with temperature and timestamp
        res.json({
            smaResult,
            currentTemperature: temperature,
            timestamp
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error fetching data or calculating SMA' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
