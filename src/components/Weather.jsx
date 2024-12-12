import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(false);  // To track API error state

  const fetchWeather = async () => {
    const cachedData = localStorage.getItem(location);

    if (cachedData) {
      console.log('Using cached data');
      setWeatherData(JSON.parse(cachedData));
      return;
    }

    console.log('Fetching new data');
    try {
      const response = await axios.get(`http://localhost:3000/api/weather/${location}`);
      setWeatherData(response.data);
      localStorage.setItem(location, JSON.stringify(response.data));
      setError(false); // Clear error if data fetch is successful
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError(true);  // Set error state to true if API call fails
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Weather Information</h2>
        <div className="mb-4">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <button
            onClick={fetchWeather}
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            Get Weather
          </button>
        </div>

        {error ? (
          <div className="text-center text-gray-600">
            <p>Failed to fetch weather data. Please try again later.</p>
          </div>
        ) : weatherData ? (
          <div className="bg-gray-100 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">
              Weather in {weatherData.name}, {weatherData.sys.country}
            </h3>
            <p className="mb-2">
              <strong className="font-medium">Temperature:</strong> {weatherData.main.temp}°C
            </p>
            <p className="mb-2">
              <strong className="font-medium">Feels Like:</strong> {weatherData.main.feels_like}°C
            </p>
            <p className="mb-2">
              <strong className="font-medium">Min Temperature:</strong> {weatherData.main.temp_min}°C
            </p>
            <p className="mb-2">
              <strong className="font-medium">Max Temperature:</strong> {weatherData.main.temp_max}°C
            </p>
            <p className="mb-2">
              <strong className="font-medium">Pressure:</strong> {weatherData.main.pressure} hPa
            </p>
            <p className="mb-2">
              <strong className="font-medium">Humidity:</strong> {weatherData.main.humidity}%
            </p>
            <p className="mb-2">
              <strong className="font-medium">Weather:</strong> {weatherData.weather[0].main} - {weatherData.weather[0].description}
            </p>
            <p className="mb-2">
              <strong className="font-medium">Wind:</strong> {weatherData.wind.speed} m/s, {weatherData.wind.deg}°
            </p>
            <p className="mb-2">
              <strong className="font-medium">Cloudiness:</strong> {weatherData.clouds.all}%
            </p>
          </div>
        ) : (
          <div className="text-center text-gray-600">
            <p>No weather data available. Please enter a location and try again.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
