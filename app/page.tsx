"use client";

import { useState } from "react";
import { WeatherCard } from "./components/WeatherCard";
import { ForecastCard } from "./components/ForecastCard";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

const Home = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [forecastData, setForecastData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isWeatherFetched, setIsWeatherFetched] = useState(false);

  const fetchWeatherData = async (city: string) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Invalid city name.");
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setWeatherData(null);
      handleFetchError(err, "weather");
    }
  };

  const fetchForecastData = async (city: string) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
      );
      const data = await res.json();
      console.log(data)
      if (!res.ok) throw new Error(data.message || "Invalid city name.");
      setForecastData(data);
      setError(null);
    } catch (err) {
      setForecastData(null);
      handleFetchError(err, "forecast");
    }
  };

  const handleFetchError = (err: unknown, type: string) => {
    if (err instanceof Error) {
      const errorMessage =
        err.message === "city not found"
          ? "City not found. Please enter a valid city."
          : `Could not fetch ${type} data. Try again.`;
      setError(errorMessage);
    } else {
      setError("An unexpected error occurred.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    setError(null);
    fetchWeatherData(city);
    fetchForecastData(city);
    setIsWeatherFetched(true);
  };

  return (
    <div
      className={
        isDarkMode
          ? "bg-gray-800 text-white min-h-screen flex flex-col"
          : "bg-gray-50 min-h-screen flex flex-col"
      }
    >
      <div className="container mx-auto p-4 flex-grow">
        <header className="flex items-center justify-between mb-6">
          <h1
            className={`text-3xl sm:text-4xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            SkyCast
          </h1>
          <button
            className="p-2 bg-gray-300 rounded-full"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? "🌙" : "☀️"}
          </button>
        </header>

        <form
          className="flex flex-col sm:flex-row items-center gap-4 mb-6"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="p-3 w-full sm:w-64 text-lg text-black border rounded-lg sm:rounded-l-lg"
            placeholder="Enter city"
          />
          <button
            type="submit"
            className="p-3 bg-green-500 text-white rounded-lg sm:rounded-r-lg"
          >
            Get Weather
          </button>
        </form>

        {error && <p className="text-xl text-red-600">{error}</p>}

        {!isWeatherFetched && (
          <div className="text-center text-2xl font-semibold">
            Your one-stop for weather info
          </div>
        )}

        {isWeatherFetched && (
          <div className="space-y-6">
            {weatherData && <WeatherCard data={weatherData} />}
            {forecastData && <ForecastCard data={forecastData} />}
          </div>
        )}
      </div>

      <footer className="bg-gray-700 text-white p-6 mt-8">
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
