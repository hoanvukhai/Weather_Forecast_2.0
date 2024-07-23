import axios from "axios";

const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
const WEATHER_API_KEY = "295b4b5d53c98e8f3cccb7be36fa3dab"; // OpenWeatherMap API key

const GEO_API_OPTIONS = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": "c51950e0aemsh690a3d905691fa3p1f013fjsne406c2081607", // Rapid API key
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
    },
};

export interface City {
    id: number;
    city: string;
    country: string;
    countryCode: string;
    latitude: number;
    longitude: number;
}

export interface WeatherData {
    // Define the structure of the weather data based on the OpenWeatherMap API response
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    weather: {
        description: string;
        icon: string;
    }[];
    wind: {
        speed: number;
        deg: number;
    };
    clouds: {
        all: number;
    };
    sys: {
        country: string;
    };
    name: string;
}

export interface ForecastData {
    // Define the structure of the forecast data based on the OpenWeatherMap API response
    list: {
        dt_txt: string;
        main: {
            temp: number;
            humidity: number;
        };
        weather: {
            description: string;
            icon: string;
        }[];
        wind: {
            speed: number;
            deg: number;
        };
        clouds: {
            all: number;
        };
    }[];
}

export async function fetchWeatherData(lat: number, lon: number): Promise<[WeatherData, ForecastData] | null> {
    try {
        const weatherResponse = await axios.get(
            `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
        );
        const forecastResponse = await axios.get(
            `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
        );

        const weatherData: WeatherData = weatherResponse.data;
        const forecastData: ForecastData = forecastResponse.data;

        return [weatherData, forecastData];
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
}

export async function fetchCities(input: string): Promise<City[]> {
    try {
        const response = await axios.get(
            `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${input}`,
            GEO_API_OPTIONS
        );

        const data: City[] = response.data.data;
        return data;
    } catch (error) {
        console.error("Error fetching cities:", error);
        return [];
    }
}
