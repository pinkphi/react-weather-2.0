import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "./Weather.css";

export default function Weather() {
 const [city, setCity] = useState();
 const [selectedUnit, setSelectedUnit] = useState("C");
 const [weatherData, setWeatherData] = useState(
  { 
    city: "New York",
    temperature: 19,
    date: moment().format('MMMM Do YYYY, h:mm:ss a'),
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
      setWeatherData({
        city: response.data.name,
        temperature: Math.round(response.data.main.temp),
        date: moment().format('MMMM Do YYYY, h:mm:ss a'),
        description: response.data.weather[0].description,
        imgUrl: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
        humidity: response.data.main.humidity,
        wind: response.data.wind.speed
      })
    });
  }

  const formattedTemperature = selectedUnit === "C" ? weatherData.temperature : Math.round(weatherData.temperature *(9/5) + 32);

  useEffect(() => {
    search("New York");
  }, []) 

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
              autoFocus="on"
              autoComplete="off"
            />
          </div>
          <div className="col-3">
            <input
              type="submit" onClick={(event) => { 
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
              <strong>{formattedTemperature}</strong>
              <span className="units">
                <a href="/" onClick={(event) => {
                  event.preventDefault();
                  setSelectedUnit("C");
                }}>
                  °C</a> | 
                <a href="/"onClick={(event) => {
                  event.preventDefault();
                  setSelectedUnit("F");
                }}>
                  °F</a>
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
