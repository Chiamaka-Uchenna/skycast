SkyCast - Weather App
SkyCast is a weather application that allows users to get real-time weather information and forecasts for any city they enter. Built with Next.js, SkyCast utilizes the OpenWeatherMap API to fetch weather data and provides a responsive experience across all devices.

Features
Real-time Weather Info: Get current weather details for any city entered.
Weather Forecast: View the weather forecast for the next few days.
Responsive Design: The app is fully responsive, working seamlessly across mobile, tablet, and desktop screens.
Dark/Light Mode: Toggle between dark and light mode for better readability.
Weather Emoji Representation: Displays appropriate weather emojis to represent the current weather condition.
Tech Stack
Frontend: Next.js (React-based framework)
API: OpenWeatherMap API for weather and forecast data
Styling: Tailwind CSS for a clean, responsive layout
State Management: React hooks (useState, useEffect)

Usage
Enter a city name in the input field.
Click "Get Weather" to view the current weather and forecast information for the city.
Switch between dark mode and light mode using the toggle button.
View weather details including temperature, humidity, description, and relevant weather emojis.


#Clone the repository:
git clone https://github.com/Chiamaka-Uchenna/skycast.git

#Navigate to the project directory:
cd skycast-weather-app

#Install dependencies:
npm install 

#Create a .env.local file in the project root and add your OpenWeatherMap API key:
NEXT_PUBLIC_API_KEY=your_api_key

#Start the development server:
npm run dev
Access the application in your browser at http://localhost:3000.

Dependencies

Next.js: React framework for building user interfaces.
React: JavaScript library for building user interfaces.
Tailwind CSS: Utility-first CSS framework for rapid UI development.


