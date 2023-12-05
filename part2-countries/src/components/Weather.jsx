import axios from "axios";
import { useEffect, useState } from "react";
const Weather=({city, countryCode})=> {
  const api_key = import.meta.env.VITE_OW_KEY;
  const [weatherData, setWeatherData] = useState(null);

  const hook = ()=> {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&APPID=${api_key}`)
    .then(response=>{
      const station = response.data;
      setWeatherData({
        temp:station.main.temp,
        icon:station.weather[0].icon,
        wind:station.wind.speed
      });
    })
    .catch(error=>{
      console.log(error);
      setWeatherData(null);
    })
  };
  useEffect(hook, [api_key, city, countryCode]);
  
  return (
    <>
    {
      weatherData ? (
      <>
        <h3>Weather in {city}</h3>
        <p>temperature {(t=>t-273.15)(weatherData.temp).toFixed(1)}{'\u00b0C'}</p>
        <img src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} className="logo" />
        <p>wind {weatherData.wind} m/s</p>
      </>
      ) : null
    }
    </>
  );
}
export default Weather