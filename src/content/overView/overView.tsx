import React from 'react';
import AirConditions from './airConditions';
import CurrentWeather from './currentWeather';
import TodaysForeCast from './todaysForecast';

interface ContentProps {
    city: string;
    lat: number;
    lon: number;
    setLoading: (isLoading: boolean) => void;
    setForecastWeather: (weather: any) => void;
    isDarkMode: boolean;
}

function OverView({ city, lat, lon, setLoading, setForecastWeather, isDarkMode }: ContentProps) {
    return(
        <div className='flex flex-col justify-between w-full md:h-auto h-96'>
            <CurrentWeather city={city} lat={lat} lon={lon} setLoading={setLoading} setForecastWeather={setForecastWeather} isDarkMode={isDarkMode}/>
            <AirConditions city={city} lat={lat} lon={lon} setLoading={setLoading} setForecastWeather={setForecastWeather} isDarkMode={isDarkMode}/>
            <TodaysForeCast lat={lat} lon={lon} setLoading={setLoading} setForecastWeather={setForecastWeather} isDarkMode={isDarkMode}/>
        </div>
    )
}

export default OverView;