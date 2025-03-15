import axios from "axios";
import { useEffect, useState } from "react";
import { Form } from "../components/Form";
import { Countries } from "../components/countries";

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
      <Form country={country} handleCountryChange={handleCountryChange} />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <Countries countries={countries} />
    </>
  );
}

export default App;
