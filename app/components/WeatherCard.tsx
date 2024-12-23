const WeatherCard = ({ data }: { data: any }) => {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;

  const getWeatherEmoji = (weatherId: number) => {
    switch (true) {
      case weatherId >= 200 && weatherId < 300: // Thunderstorm
        return "🌩️"; // Thunderstorm emoji
      case weatherId >= 300 && weatherId < 400: // Drizzle
        return "☔"; // Drizzle/Light rain emoji
      case weatherId >= 500 && weatherId < 600: // Rain
        return "🌧️"; // Rain emoji
      case weatherId >= 600 && weatherId < 700: // Snow
        return "❄️"; // Snow emoji
      case weatherId >= 700 && weatherId < 800: // Atmosphere (mist, fog, smoke)
        return "🌫️"; // Foggy/Misty emoji
      case weatherId === 800: // Clear Sky
        return "☀️"; // Sun emoji
      case weatherId >= 801 && weatherId < 810: // Clouds
        return "☁️"; // Cloud emoji
      default:
        return "❓"; // Default emoji for unknown weather
    }
  };

  const fahrenheitTemp = (((temp - 273.15) * 9) / 5 + 32).toFixed(2); // Convert temp to Fahrenheit and fix to 2 decimal places

  return (
    <div className="bg-gradient-to-b from-blue-500 to-yellow-300 p-6 rounded-lg shadow-md flex flex-col items-center animate-pulse">
      <h1 className="text-3xl font-bold">{city}</h1>
      <p className="text-xl">{fahrenheitTemp}°F</p>
      <p className="text-lg">Humidity: {humidity}%</p>
      <p className="text-lg italic">{description}</p>
      <p className="text-6xl">{getWeatherEmoji(id)}</p>
    </div>
  );
};

export { WeatherCard };
