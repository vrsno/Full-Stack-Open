import { useState } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

export const Countries = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [weather, setWeather] = useState("No weather data available");

  const toggleExpand = async (country) => {
    if (selectedCountry === country) {
      setSelectedCountry("");
      setWeather("No weather data available");
      return;
    }

    setSelectedCountry(country);
    setWeather("Fetching weather..."); // mientras carga el weather

    if (country.capital && country.capital.length > 0) {
      await fetchWeather(country.capital[0]);
    } else {
      setWeather("No capital city available");
    }
  };

  const fetchWeather = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );

      setWeather({
        temperature: response.data.main.temp,
        windSpeed: response.data.wind.speed,
        icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeather("Weather information not found");
    }
  };

  return (
    <ul>
      {countries.map((c) => (
        <li key={c.name?.common}>
          {c.name?.common}{" "}
          <button onClick={() => toggleExpand(c)}>
            {selectedCountry === c ? "Hide" : "Show"}
          </button>
          {selectedCountry === c && (
            <div>
              <p>Capital: {c.capital ? c.capital[0] : "No capital"}</p>
              <p>Area: {c.area}</p>
              <h2>Languages:</h2>
              <ul>
                {c.languages &&
                  Object.values(c.languages).map((lang, index) => (
                    <li key={index}>{lang}</li>
                  ))}
              </ul>
              {c.flags?.svg && (
                <img
                  src={c.flags.svg}
                  alt={`Flag of ${c.name.common}`}
                  width="150"
                />
              )}

              <div>
                <h3>Weather in {c.capital ? c.capital[0] : "Unknown"}</h3>
                {typeof weather === "string" ? (
                  <p>{weather}</p>
                ) : (
                  <>
                    <p>Temperature: {weather.temperature}°C</p>
                    <img src={weather.icon} alt="Weather icon" width="70" />
                    <p>Wind: {weather.windSpeed} m/s</p>
                  </>
                )}
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};
