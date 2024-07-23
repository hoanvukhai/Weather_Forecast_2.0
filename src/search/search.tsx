import React, { useState, useRef, useEffect, useCallback  } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { fetchCities, City } from '../api/api';

interface SearchProps {
    onCitySelect: (city: string, lat: number, lon: number) => void;
    isDarkMode: boolean;
}

function Search({ onCitySelect, isDarkMode}: SearchProps) {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [cities, setCities] = useState<City[]>([]);
    const [selectedCity, setSelectedCity] = useState<City | null>(null);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const debounce = (func: Function, delay: number) => {
        let timer: NodeJS.Timeout;
        return (...args: any[]) => {
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), delay);
        };
    };

    const fetchCitiesDebounced = useCallback(
        debounce(async (input: string) => {
            const citiesData = await fetchCities(input);
            setCities(citiesData);
        }, 1000), []
    );

    const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        setSearchText(input);
        setDropdownVisible(true);
        fetchCitiesDebounced(input);
        setHighlightedIndex(-1);
    };

    const handleCityClick = (city: City) => {
        onCitySelect(city.city, city.latitude, city.longitude);
        setSelectedCity(city);
        setSearchText(city.city);
        setSearchText("");
        setDropdownVisible(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (dropdownRef.current && !dropdownRef.current.contains(target)) {
            if (
                !(target instanceof HTMLInputElement) &&
                !(target instanceof HTMLButtonElement) &&
                !(target.nodeName.toLowerCase() === 'svg') &&
                !(target.parentElement?.classList.contains('svg-inline--fa'))
            ) {
                setDropdownVisible(false);
                setSearchText("");
            }
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'ArrowDown') {
            setHighlightedIndex((prevIndex) => (prevIndex + 1) % cities.length);
        } else if (event.key === 'ArrowUp') {
            setHighlightedIndex((prevIndex) => (prevIndex - 1 + cities.length) % cities.length);
        } else if (event.key === 'Enter') {
            if (highlightedIndex >= 0 && highlightedIndex < cities.length) {
                handleCityClick(cities[highlightedIndex]);
            } else if (cities.length > 0) {
                handleCityClick(cities[0]);
            }
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (dropdownVisible) {
            inputRef.current?.focus();
        }
    }, [dropdownVisible]);

    return (
        <div>
            <div className="relative flex items-center justify-center bg-white border rounded-md">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder={selectedCity ? `${selectedCity.city}, ${selectedCity.countryCode}` : "Search for cities"}
                    value={searchText}
                    onChange={handleSearchChange}
                    onClick={() => setDropdownVisible(!dropdownVisible)}
                    onKeyDown={handleKeyDown}
                    className="w-full border border-white my-2 text-gray-900 focus:outline-none px-2"
                />
                <button 
                    className={
                        isDarkMode
                        ? "bg-white text-gray-400 hover:text-gray-500 px-2 border-l-2"
                        : "bg-white text-sky-400 hover:text-sky-500 px-2 border-l-2"}
                    onClick={() => setDropdownVisible(!dropdownVisible)}
                >
                    <FontAwesomeIcon 
                        icon={faAngleUp}
                        className={`transition-transform duration-300 ${dropdownVisible ? 'rotate-0' : 'rotate-180'}`}
                    />
                </button>
                {dropdownVisible && (
                    <div ref={dropdownRef} className="absolute top-full left-0 w-full bg-white border rounded-md mt-1 z-10">
                        {cities.filter(city => city.city.toLowerCase().includes(searchText.toLowerCase())).map((city, index) => (
                            <div
                                key={city.id} 
                                onClick={() => handleCityClick(city)} 
                                className={`px-2 py-1 hover:bg-gray-200 cursor-pointer ${highlightedIndex === index ? 'bg-gray-200' : ''}`}
                            >
                                {city.city}, {city.countryCode}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Search;
