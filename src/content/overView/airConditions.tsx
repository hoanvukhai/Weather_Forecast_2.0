import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTemperatureQuarter,
  faWind,
  faCloud,
  faDroplet,
} from "@fortawesome/free-solid-svg-icons";
import { fetchWeatherData, WeatherData } from "../../api/api";

interface CurrentWeatherProps {
  city: string;
  lat: number;
  lon: number;
  setLoading: (isLoading: boolean) => void;
  setForecastWeather: (currentWeather: any) => void;
  isDarkMode: boolean;
}

function AirConditions({
  city,
  lat,
  lon,
  setLoading,
  setForecastWeather,
  isDarkMode,
}: CurrentWeatherProps) {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(
    null
  );

  useEffect(() => {
    const getWeatherData = async () => {
      setLoading(true);
      const data = await fetchWeatherData(lat, lon);
      if (data) {
        setCurrentWeather(data[0]);
      }
      setLoading(false);
    };
    getWeatherData();
  }, [lat, lon, setLoading, setForecastWeather]);

  if (!currentWeather) {
    return null; // Hiển thị thông báo khi dữ liệu chưa tải xong
  }

  const { main } = currentWeather;
  const temperature = currentWeather.main.temp.toFixed();
  const humidity = main.humidity;
  const windSpeed = currentWeather.wind.speed;
  const cloudAll = currentWeather.clouds.all;

  return (
    <div>
      <div
        className={
          isDarkMode
            ? "flex justify-center text-gray-200 font-bold mb-4"
            : "flex justify-center text-sky-400 font-bold mb-4"
        }
      >
        AIR CONDITIONS
      </div>
      <div>
        <div className="grid grid-cols-4 justify-items-center">
          <div
            className={
              isDarkMode ? "text-gray-300 text-sm" : "text-sky-500/50 text-sm"
            }
          >
            <FontAwesomeIcon icon={faTemperatureQuarter} /> Real Feel
          </div>
          <div
            className={
              isDarkMode ? "text-gray-300 text-sm" : "text-sky-500/50 text-sm"
            }
          >
            <FontAwesomeIcon icon={faWind} /> Wind
          </div>
          <div
            className={
              isDarkMode ? "text-gray-300 text-sm" : "text-sky-500/50 text-sm"
            }
          >
            <FontAwesomeIcon icon={faCloud} /> Clouds
          </div>
          <div
            className={
              isDarkMode ? "text-gray-300 text-sm" : "text-sky-500/50 text-sm"
            }
          >
            <FontAwesomeIcon icon={faDroplet} /> Humidity
          </div>
          <div
            className={
              isDarkMode
                ? "text-white text-xl font-medium"
                : "text-sky-500 text-xl font-medium"
            }
          >
            {temperature} °C
          </div>
          <div
            className={
              isDarkMode
                ? "text-white text-xl font-medium"
                : "text-sky-500 text-xl font-medium"
            }
          >
            {windSpeed} m/s
          </div>
          <div
            className={
              isDarkMode
                ? "text-white text-xl font-medium"
                : "text-sky-500 text-xl font-medium"
            }
          >
            {cloudAll} %
          </div>
          <div
            className={
              isDarkMode
                ? "text-white text-xl font-medium"
                : "text-sky-500 text-xl font-medium"
            }
          >
            {humidity} %
          </div>
        </div>
      </div>
    </div>
  );
}

export default AirConditions;
