import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!country.trim()) {
      setCountries([]);
      setError(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://studies.cs.helsinki.fi/restcountries/api/all`
        );
        console.log(response.data);

        const filteredCountries = response.data.filter((c) =>
          c.name.common.toLowerCase().includes(country.toLowerCase())
        );

        if (filteredCountries.length > 10) {
          setCountries([]);
          setError("Too many matches, please refine your search.");
        } else {
          setCountries(filteredCountries);
          setError(false);
        }
      } catch (err) {
        console.log(err);

        setError("Error fetching data");
        setCountries([]);
      }
    };
    // para no llamar multiples veces a la api

    const delay = setTimeout(fetchData, 500);
    return () => clearTimeout(delay);
  }, [country]);

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    setError(false);
  };

  return (
    <>
      <div>
        <p>Find country</p>
        <input type="text" value={country} onChange={handleCountryChange} />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {countries.length === 1 ? (
        <div>
          <h2>{countries[0].name.common}</h2>
          <p>Capital: {countries[0].capital}</p>
          <p>Area: {countries[0].area}</p>
          <h2>Languages:</h2>
          <ul>
            {countries[0].languages &&
              Object.values(countries[0].languages).map((lang, index) => (
                <li key={index}>{lang}</li>
              ))}
          </ul>

          <img
            src={countries[0].flags.svg}
            alt={`Flag of ${countries[0].name.common}`}
            width="150"
          />
        </div>
      ) : (
        <ul>
          {countries.map((c) => (
            <li key={c.name.common}>{c.name.common}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
