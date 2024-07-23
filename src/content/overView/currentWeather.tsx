import React, { useState, useEffect } from "react";
import { fetchWeatherData, WeatherData } from "../../api/api";
import weatherIcons from "../../weatherIcons";

interface CurrentWeatherProps {
  city: string;
  lat: number;
  lon: number;
  setLoading: (isLoading: boolean) => void;
  setForecastWeather: (currentWeather: any) => void;
  isDarkMode: boolean;
}

const monthsOfYear = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function CurrentWeather({
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
  const [currentTime, setCurrentTime] = useState(new Date());

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  if (!currentWeather) {
    return null; // Hiển thị thông báo khi dữ liệu chưa tải xong
  }

  const country = currentWeather.sys.country;
  const temperature = currentWeather.main.temp.toFixed();
  const description = currentWeather.weather[0].description;
  const icon = currentWeather.weather[0].icon;
  const iconSrc = weatherIcons[(icon as keyof typeof weatherIcons) || ""];
  const day = currentTime.getDate();
  const month = currentTime.getMonth();
  const changedMonth = monthsOfYear[month];
  const date = `${day} ${changedMonth}`;

  return (
    <div className="">
      <div
        className={
          isDarkMode
            ? "flex justify-center text-gray-200 font-bold mb-4"
            : "flex justify-center text-sky-400 font-bold mb-4"
        }
      >
        CURRENT WEATHER
      </div>
      <div className="grid grid-cols-3 justify-items-center items-center">
        <div>
          <div
            className={
              isDarkMode
                ? "text-white text-xl font-medium text-center"
                : "text-sky-500 text-xl font-medium text-center"
            }
          >
            {city}, {country}
          </div>
          <div
            className={
              isDarkMode
                ? "text-gray-300 text-sm text-center"
                : "text-sky-500/50 text-sm text-center"
            }
          >
            Today {date}
          </div>
        </div>
        <div>
          <div
            className={
              isDarkMode
                ? "text-white text-xl font-medium text-center"
                : "text-sky-500 text-xl font-medium text-center"
            }
          >
            {temperature}°C
          </div>
          <div
            className={
              isDarkMode
                ? "text-gray-300 text-sm text-center"
                : "text-sky-500/50 text-sm text-center"
            }
          >
            {description}
          </div>
        </div>
        <div
          className="row-span-2 w-14">
          <img src={iconSrc} alt="" className={isDarkMode?'':"bg-sky-400 bg-opacity-40 rounded"} />
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;
