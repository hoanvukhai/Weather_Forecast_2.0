import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import sky from "./img/sky2.jpg";
import nightSky from "./img/NightSky2.jpeg";
import Header from "./header/header";
import Search from "./search/search";
import Content from "./content/content";
import Info from "./info/info";
import Loading from "./loading/loading";

function App() {
  const [selectedCity, setSelectedCity] = useState("");
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [forecastWeather, setForecastWeather] = useState<any>(null);
  const [isDarkMode, setIsDarkMode] = useState(false); // trạng thái dark mode

  const handleCitySelect = (
    city: string,
    latitude: number,
    longitude: number
  ) => {
    setSelectedCity(city);
    setLat(latitude);
    setLon(longitude);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    setLoading(!forecastWeather);
  }, [forecastWeather]);

  return (
    <div>
      <div
        className="h-screen flex justify-center items-start"
        // {
        //   isDarkMode
        //     ? "h-screen bg-gradient-to-b from-black to-blue-900 flex justify-center items-start"
        //     : "h-screen bg-sky-100 flex justify-center items-start"
        // }
      >
        <div
          style={
            isDarkMode
              ? { backgroundImage: `url(${nightSky})` }
              : { backgroundImage: `url(${sky})` }
          }
          className={`bg-cover w-screen max-w-5xl min-w-96 md:h-auto ${selectedCity && lat !== null && lon !== null ? "" : "h-full"} md:rounded-3xl shadow-2xl px-4 md:mt-5 transition-all duration-1000`} 
        >
          <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
          <Search onCitySelect={handleCitySelect} isDarkMode={isDarkMode} />
          {selectedCity && lat !== null && lon !== null ? (
            <>
              {isLoading && <Loading isDarkMode={isDarkMode} />}
              <Content
                city={selectedCity}
                lat={lat}
                lon={lon}
                setLoading={setLoading}
                setForecastWeather={setForecastWeather}
                isDarkMode={isDarkMode}
              />
            </>
          ) : (
            <Info isDarkMode={isDarkMode} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
