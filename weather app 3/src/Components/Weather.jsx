import React, { useState } from 'react';
import './Weather.css';
import { FaSearch, FaWind } from "react-icons/fa";
import { MdLocationOn } from 'react-icons/md';
import { WiHumidity } from 'react-icons/wi';

let Weather = () => {
    let [city, setCity] = useState('');
    let [weather, setWeather] = useState(null);
    let [error, setError] = useState('');

    let API_KEY = "5acc1683650652bab831ecf7d57fd397";

    function handleOnChange(event) {
        setCity(event.target.value);
    }

    function fetchData() {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

        fetch(url, {
            method: "GET"
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('No data found. Please enter a valid city name.');
            }
            return response.json();
        })
        .then((data) => {
            setWeather(data);
            console.log(data);
            setError('');
        })
        .catch((err) => {
            setError(err.message);
            setWeather(null);
        });
    }

    return (
        
        <div className='container'>
            <div className='city'>
                <input type='text' value={city} onChange={handleOnChange} placeholder='Enter any city name' />
                <button onClick={fetchData}>
                    <FaSearch />
                </button>
            </div>
           

            {error && <p className='error-message'>{error}</p>}

            {weather && weather.weather &&
                <div className='content'>
                    <div className='weather-image'>
                        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='' />
                        <h3 className='desc'>{weather.weather[0].description}</h3>
                    </div>
                    
                    <div className='weather-temp'>
                        <h2>{weather.main.temp}<span>&deg;C</span></h2>
                    </div>

                    <div className='weather-city'>
                        <div className='location'>
                            <MdLocationOn />
                        </div>
                        <p>{weather.name},<span>{weather.sys.country}</span></p>
                    </div>

                    <div className='weather-stats'>
                        <div className='wind'>
                            <div className='wind-icon'>
                                <FaWind />
                            </div>
                            <h3 className='wind-speed'>{weather.wind.speed}<span>Km/h</span></h3>
                            <h3 className='wind-heading'>Wind Speed</h3>
                        </div>
                        <div className='humidity'>
                            <div className='humidity-icon'>
                                <WiHumidity />
                            </div>
                            <h3 className='humidity-percent'>{weather.main.humidity}<span>%</span></h3>
                            <h3 className='humidity-heading'>Humidity</h3>
                        </div>
                    </div>
                </div>
            }
        </div>
        
    )
}

export default Weather;
