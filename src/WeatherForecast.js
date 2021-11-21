import React, { useState } from "react";
import WeatherIcon from "./WeatherIcon";
import "./WeatherForecast.css";
import axios from "axios";
import WeatherForecastDay from "./WeatherForecastDay";

export default function WeatherForecast(props) {

    const [loaded, setLoaded] = useState(false);
    const [forecast, setForecast] = useState(null);

    function handleResponse(response) {
        setForecast(response.data.daily);
        setLoaded(true);
      }
    
    if (loaded) {
        return (
          <div className="WeatherForecast">
            <div className="row">
              <div className="col">
                <WeatherForecastDay data={forecast[0]} />
              </div>
              <div className="col">
                <WeatherForecastDay data={forecast[1]} />
              </div><div className="col">
                <WeatherForecastDay data={forecast[2]} />
              </div><div className="col">
                <WeatherForecastDay data={forecast[3]} />
              </div><div className="col">
                <WeatherForecastDay data={forecast[4]} />
              </div>
            </div>
          </div>
        );

} else { 

    let apiKey = "9450c4e093311119f00946463ff53dcd";
    let longitude = props.coordinates.lon;
    let latitude = props.coordinates.lat;
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(handleResponse);
    
    return (null);
    }
}