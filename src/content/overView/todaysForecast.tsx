import React, { useState, useEffect } from "react";
import { fetchWeatherData, ForecastData } from "../../api/api";
import weatherIcons from "../../weatherIcons";

interface TodaysForeCastProps {
  lat: number;
  lon: number;
  setLoading: (isLoading: boolean) => void;
  setForecastWeather: (forecast: any) => void;
  isDarkMode: boolean;
}

function TodaysForeCast({
  lat,
  lon,
  setLoading,
  setForecastWeather,
  isDarkMode,
}: TodaysForeCastProps) {
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [todayForecast, setTodayForecast] = useState<any[]>([]);

  useEffect(() => {
    const getForecastData = async () => {
      setLoading(true);
      const data = await fetchWeatherData(lat, lon);
      if (data) {
        setForecast(data[1]);
      }
      setLoading(false);
    };

    getForecastData();
  }, [lat, lon, setLoading, setForecastWeather]);

  useEffect(() => {
    if (forecast) {
      const currentTime = new Date();

      // Filter forecast for today
      const todayForecasts = forecast.list.filter((forecastItem: any) => {
        const forecastTime = new Date(forecastItem.dt_txt);
        return (
          forecastTime.getDate() === currentTime.getDate() &&
          forecastTime.getMonth() === currentTime.getMonth() &&
          forecastTime.getFullYear() === currentTime.getFullYear()
        );
      });
      setTodayForecast(todayForecasts);
    }
  }, [forecast]);

  if (!forecast) {
    return null;
  }
  return (
    <div>
      <div className="mb-4">
        <div
          className={
            isDarkMode
              ? "flex justify-center text-gray-200 font-bold"
              : "flex justify-center text-sky-400 font-bold"
          }
        >
          TODAY'S FORECAST
        </div>
        <div
          className={
            isDarkMode
              ? "text-sky-300 text-sm flex justify-center"
              : "text-sky-500/50 text-sm flex justify-center"
          }
        >
          {todayForecast.length} available forecasts
        </div>
      </div>
      <div className="flex justify-center">
        {todayForecast.map((forecastItem, index) => {
          const icon = forecastItem.weather[0].icon;
          const iconSrc =
            weatherIcons[(icon as keyof typeof weatherIcons) || ""];
          const temperature = forecastItem.main.temp.toFixed();
          const time = forecastItem.dt_txt.split(" ")[1].slice(0, 5);
          return (
            <div
              className={
                isDarkMode
                  ? `bg-gray-300  ${
                      index === 0 ? "bg-opacity-40" : "bg-opacity-10"
                    } rounded-lg m-0.5 py-1 flex flex-col items-center w-[20%]`
                  : `bg-sky-400  ${
                      index === 0 ? "bg-opacity-40" : "bg-opacity-10"
                    } rounded-lg m-0.5 py-1 flex flex-col items-center w-[20%]`
              }
              key={index}
            >
              <div
                className={
                  isDarkMode
                    ? "text-gray-300 text-xs font-medium"
                    : "text-sky-500/50 text-xs font-medium"
                }
              >
                {time}
              </div>
              <div className="size-8">
                <img src={iconSrc} alt="icon" />
              </div>
              <div
                className={
                  isDarkMode
                    ? "text-white text-sm font-bold"
                    : "text-sky-400 text-sm font-bold"
                }
              >
                {temperature}°C
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TodaysForeCast;
