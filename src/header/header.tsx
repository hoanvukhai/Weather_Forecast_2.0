import React, { useState, useEffect } from "react";
import logo from "./logo_weather.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import "../button.css"

interface HeaderProps {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

function Header({ toggleDarkMode, isDarkMode }: HeaderProps) {
  // const now = new Date();
  // const year = now.getFullYear();
  // const month = now.getMonth() + 1;
  // const day = now.getDate();
  // const hour = now.getHours();
  // const minute = now.getMinutes();
  // const formatDate = `${year}-${month}-${day} ${hour}:${minute} GMT`;

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
      const interval = setInterval(() => {
          setCurrentTime(new Date());
      }, 1000);
      return () => {
          clearInterval(interval);
      };
  }, []);

  const formattedTime = currentTime.toLocaleTimeString();
  const formattedDate = currentTime.toLocaleDateString();
  const formatDateTime = `${formattedTime} - ${formattedDate} `;

  return (
    <div className="flex justify-between items-center my-2 h-12">
      <div>
        <input type="checkbox" id="dark-mode" className="inputDarkMode" onClick={toggleDarkMode}/>
        <label htmlFor="dark-mode" className="labelDarkMode"></label>
        <div className="background"></div>
      </div>
      <div
        className={
          isDarkMode
            ? "text-gray-300 font-bold md:text-base text-xs"
            : "text-sky-400 font-bold md:text-base text-xs"
        }
      >
        {formatDateTime}
      </div>
      <div>
        <a href="https://github.com/hoanvukhai/Weather_Forecast_2.0" target="_blank" rel="noreferrer">
            <div 
                className={
                    isDarkMode
                    ? "text-white hover:text-blue-500"
                    : "text-sky-300 hover:text-white"
                }
            >
            <FontAwesomeIcon icon={faGithub} className="text-4xl" />
          </div>
        </a>
      </div>
    </div>
  );
}

export default Header;
