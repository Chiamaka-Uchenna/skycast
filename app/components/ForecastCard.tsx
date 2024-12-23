const ForecastCard = ({ data }: { data: any }) => {
  const forecastList = data.list.slice(0, 5);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
      {forecastList.map((forecast: any, index: number) => {
        const {
          main: { temp },
          weather: [{ description }],
          dt_txt,
        } = forecast;
        const date = new Date(dt_txt).toLocaleString();

        return (
          <div
            key={index}
            className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md text-center"
          >
            <h2 className="text-xl font-semibold">{date}</h2>
            <p className="text-lg">{((temp - 273.15) * 9) / 5 + 32}°F</p>
            <p className="text-md">{description}</p>
          </div>
        );
      })}
    </div>
  );
};

export { ForecastCard };
