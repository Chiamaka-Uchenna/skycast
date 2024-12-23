"use client";

import { useState, useEffect } from "react";
import { WeatherCard } from "./components/WeatherCard";
import { ForecastCard } from "./components/ForecastCard";

// Access API Key from environment variables (updated to NEXT_PUBLIC_ prefix for Next.js)
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

const Home = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [forecastData, setForecastData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isWeatherFetched, setIsWeatherFetched] = useState(false);

  // Fetch current weather data
  const fetchWeatherData = async (city: string) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setWeatherData(data);
      setError(null);
    } catch (error) {
      setError("Could not fetch weather data");
    }
  };

  // Fetch forecast data
  const fetchForecastData = async (city: string) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setForecastData(data);
      setError(null);
    } catch (error) {
      setError("Could not fetch forecast data");
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeatherData(city);
      fetchForecastData(city);
      setIsWeatherFetched(true);
    }
  };

  return (
    <div className={isDarkMode ? "bg-gray-800 text-white" : "bg-gray-50"}>
      <div className="container mx-auto p-4">
        <header className="flex justify-between items-center mb-6">
          <h1
            className={`text-4xl font-bold ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            SkyCast
          </h1>
          <button
            className="p-2 bg-gray-300 rounded-full"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? "🌙" : "🌞"}
          </button>
        </header>

        <form className="flex mb-6" onSubmit={handleSubmit}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="p-3 w-64 text-lg text-black border rounded-l-lg"
            placeholder="Enter city"
          />
          <button
            type="submit"
            className="p-3 bg-green-500 text-white rounded-r-lg"
          >
            Get Weather
          </button>
        </form>

        {error && <p className="text-xl text-red-600">{error}</p>}

        {!isWeatherFetched && (
          <div className="mb-60">
            <div className="text-center text-2xl font-semibold">
              Your one-stop for weather info
            </div>
          </div>
        )}

        {isWeatherFetched && (
          <div className="space-y-6">
            {weatherData && <WeatherCard data={weatherData} />}
            {forecastData && <ForecastCard data={forecastData} />}
          </div>
        )}
      </div>

      <footer className="bg-black text-white p-6 mt-8">
        <div className="container mx-auto text-center">
          <p className="text-lg">
            &copy; 2024 SkyCast - Your weather companion
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
