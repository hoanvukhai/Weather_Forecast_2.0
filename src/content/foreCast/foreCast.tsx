import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTemperatureQuarter,
  faWind,
  faCloud,
  faDroplet,
} from "@fortawesome/free-solid-svg-icons";
import { fetchWeatherData, ForecastData } from "../../api/api";
import weatherIcons from "../../weatherIcons";

interface TodaysForeCastProps {
  lat: number;
  lon: number;
  setLoading: (isLoading: boolean) => void;
  setForecastWeather: (forecast: any) => void;
  isDarkMode: boolean;
}

function ForeCast({
  lat,
  lon,
  setLoading,
  setForecastWeather,
  isDarkMode,
}: TodaysForeCastProps) {
  const [forecast, setForecast] = useState<ForecastData | null>(null);

  useEffect(() => {
    const getForecastData = async () => {
      setLoading(true);
      const data = await fetchWeatherData(lat, lon);
      if (data) {
        setForecast(data[1]);
        setForecastWeather(data[1]);
      }
      setLoading(false);
    };
    getForecastData();
  }, [lat, lon, setLoading, setForecastWeather]);

  if (!forecast) {
    return null;
  }

  return (
    <div className="flex flex-col items-center w-full">
      <div
        className={
          isDarkMode
            ? "flex justify-center text-gray-200 font-bold mb-4"
            : "flex justify-center text-sky-400 font-bold mb-4"
        }
      >
        WEEKLY FORECAST
      </div>
      <div className="w-full">
        {forecast.list
          .filter((_, index) => index % 8 === 0)
          .slice(0)
          .map((weeklyForecast, index) => {
            //slice(1) bỏ ngày hôm nay
            const daysOfWeek = [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ];
            const date = new Date(weeklyForecast.dt_txt);
            const today = daysOfWeek[date.getDay()];
            const temperature = weeklyForecast.main.temp.toFixed();
            const wind = weeklyForecast.wind.speed;
            const description = weeklyForecast.weather[0].description;
            const clouds = weeklyForecast.clouds.all;
            const humidity = weeklyForecast.main.humidity;
            const icon = weeklyForecast.weather[0].icon;
            const iconSrc =
              weatherIcons[(icon as keyof typeof weatherIcons) || ""];

            return (
              <div
                className={
                  isDarkMode
                    ? "grid grid-cols-3 justify-items-center  bg-gray-300 bg-opacity-10  py-1 rounded-lg my-1 px-4 gap-y-1"
                    : "grid grid-cols-3 justify-items-center  bg-sky-400 bg-opacity-10  py-1 rounded-lg my-1 px-4 gap-y-1"
                }
                key={index}
              >
                <div
                  className={
                    isDarkMode
                      ? "text-white font-bold justify-self-start"
                      : "text-sky-500 font-bold justify-self-start"
                  }
                >
                  {today}
                </div>
                <div className="flex justify-between">
                  <div
                    className={
                      isDarkMode 
                      ? "text-gray-300 mr-2" 
                      : "text-sky-500/50 mr-2"
                    }
                  >
                    <FontAwesomeIcon icon={faTemperatureQuarter} />
                  </div>
                  <div
                    className={
                      isDarkMode
                        ? "text-white font-bold"
                        : "text-sky-500 font-bold"
                    }
                  >
                    {temperature} °C
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className={
                      isDarkMode 
                      ? "text-gray-300 mr-2" 
                      : "text-sky-500/50 mr-2"
                    }>
                    <FontAwesomeIcon icon={faWind} />
                  </div>
                  <div className={
                      isDarkMode
                        ? "text-white font-bold"
                        : "text-sky-500 font-bold"
                    }>{wind} m/s</div>
                </div>
                <div className="grid grid-cols-4 justify-self-start items-center">
                  <div className="mr-1">
                    <img src={iconSrc} alt="" className="" />
                  </div>
                  <div className={isDarkMode ?'text-xs col-span-3 text-gray-300':"text-xs col-span-3 text-sky-400"}>
                    {description}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className={
                      isDarkMode 
                      ? "text-gray-300 mr-2" 
                      : "text-sky-500/50 mr-2"
                    }>
                    <FontAwesomeIcon icon={faCloud} />
                  </div>
                  <div className={
                      isDarkMode
                        ? "text-white font-bold"
                        : "text-sky-500 font-bold"
                    }>{clouds} %</div>
                </div>
                <div className="flex justify-between">
                  <div className={
                      isDarkMode 
                      ? "text-gray-300 mr-2" 
                      : "text-sky-500/50 mr-2"
                    }>
                    <FontAwesomeIcon icon={faDroplet} />
                  </div>
                  <div className={
                      isDarkMode
                        ? "text-white font-bold"
                        : "text-sky-500 font-bold"
                    }>{humidity} %</div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ForeCast;
