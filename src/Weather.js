import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

export default function Weather() {
 const [city, setCity] = useState();
 const [weatherData, setWeatherData] = useState(
  { 
    city: "New York",
    temperature: 19,
    date: "Tuesday 10:00",
    description: "Cloudy",
    imgUrl: "https://ssl.gstatic.com/onebox/weather/64/sunny.png",
    humidity: 80,
    wind: 10
  }
 );

  function search(city) {
    let apiKey = "9450c4e093311119f00946463ff53dcd";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then((response)=>{
      getForcast(response.data.coord);
    });
  }

  function getForcast(coordinates) {
    console.log(coordinates);
    let apiKey = "9450c4e093311119f00946463ff53dcd";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    console.log(apiUrl);
    axios.get(apiUrl).then((response)=>{
      setWeatherData({
        city: city,
        temperature: response.data.current.temp,
        date: "Tuesday 10:00",
        description: response.data.current.weather[0].description,
        imgUrl: "https://ssl.gstatic.com/onebox/weather/64/sunny.png",
        humidity: response.data.current.humidity,
        wind: response.data.current.wind_deg
      })
    });
  }

  return (
    <div className="Weather">
      <form className="mb-3">
        <div className="row">
          <div className="col-9">
            <input
              type="search"
              placeholder="Type a city.."
              value={city}
              onChange={(event)=>{
                setCity(event.target.value);
              }}
              className="form-control"
              autoComplete="off"
            />
          </div>
          <div className="col-3">
            <input
              type="submit" onClick={(event)=>{ 
               event.preventDefault();
               search(city); 
              }}
              value="Search"
              className="btn btn-primary w-100"
            />
          </div>
        </div>
      </form>
      <div className="overview">
        <h1>{weatherData.city}</h1>
        <ul>
          <li>Last updated: {weatherData.date}</li>
          <li>{weatherData.description}</li>
        </ul>
      </div>
      <div className="row">
        <div className="col-6">
          <div className="clearfix weather-temperature">
            <img
              src={weatherData.imgUrl}
              alt={weatherData.description}
              className="float-left"
            />
            <div className="float-left">
              <strong>{weatherData.temperature}</strong>
              <span className="units">
                <a href="/">°C</a> | <a href="/">°F</a>
              </span>
            </div>
          </div>
        </div>
        <div className="col-6">
          <ul>
            <li>Humidity: {weatherData.humidity}%</li>
            <li>Wind: {weatherData.wind} km/h</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
