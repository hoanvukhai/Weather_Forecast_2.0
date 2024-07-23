import React, { useState, useEffect } from 'react';
import ForeCast from './foreCast/foreCast';
import OverView from './overView/overView';
import Loading from '../loading/loading';

interface ContentProps {
    city: string;
    lat: number;
    lon: number;
    setLoading: (loading: boolean) => void;
    setForecastWeather: (weather: any) => void;
    isDarkMode: boolean;
}

function Content({ city, lat, lon, setLoading, setForecastWeather, isDarkMode }: ContentProps) {
    
    return (
        <div>
            <div className='flex flex-col md:flex-row md:space-x-4 my-8 md:space-y-0 space-y-8'>
                <OverView city={city} lat={lat} lon={lon} setLoading={setLoading} setForecastWeather={setForecastWeather} isDarkMode={isDarkMode}/>
                <ForeCast lat={lat} lon={lon} setLoading={setLoading} setForecastWeather={setForecastWeather} isDarkMode={isDarkMode}/>
            </div>
        </div>

    );
}

export default Content;