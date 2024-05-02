import { useState, useEffect, useMemo } from "react";
import { fetchCountries, fetchState, fecthCities } from "../api/api.js";
import { fetchAccesToken } from "../api/auth";
import { BiReset } from "react-icons/bi";

const CountrieOption = () => {
const [countries, setCountries] = useState([]);
const [selectedCountry, setSelectedCountry] = useState("");
const [states, setStates] = useState([]);
const [selectedState, setSelectedState] = useState("");
const [cities, setCities] = useState([]);
const [selectedCity, setSelectedCity] = useState("");
const [auth_token, setAuth_token] = useState(null);
const [show, setShow] = useState("countries");

console.log(countries);
console.log(selectedCountry);
console.log(selectedState);
console.log(selectedCity);

useEffect(() => {
    fetchAccesToken()
    .then((token) => {
        setAuth_token(token);
        fetchCountries(token)
        .then((data) => {
            setCountries(data);
        });
    })
    .catch((error) => {
        console.error("Error fetching access token:", error);
    });
}, []);

const memoizedFetchState = useMemo(() => fetchState, []);
const memoizedFetchCities = useMemo(() => fecthCities, []);

const handleCountryChange = (e) => {
    const selectedCountryValue = e.target.value;
    setSelectedCountry(selectedCountryValue);
    setShow("states");

    memoizedFetchState(auth_token, selectedCountryValue)
    .then((data) => {
        setStates(data);
    })
    .catch((error) => {
        console.error("Error fetching states:", error);
    });
};

const handleStateChange = (e) => {
    const selectedStateValue = e.target.value;
    setSelectedState(selectedStateValue);
    setShow("cities");

    memoizedFetchCities(auth_token, selectedStateValue)
    .then((data) => {
        setCities(data);
    })
    .catch((error) => {
        console.error("Error fetching cities:", error);
    });
};

const handleCityChange = (e) => {
    const selectedCityValue = e.target.value;
    setSelectedCity(selectedCityValue);
    setShow("cities");
};

  //te implemente el usememo porque te estaba renderizando muchisimas veces el componente
  //como ya tienes los valores de las 3 cosas pais, estado, ciudad...ya puedes hacer el fetch
  //https://api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}
  //la cosa es que necesitas tener los codigos de los estados y los paises, en los paises te llega como country_short_name

const handleReset = () => {
    setSelectedCountry("");
    setSelectedState("");
    setSelectedCity("");
    setShow("countries");
};

    return (
    <div className="w-full">
        <section className="flex justify-center">
            <div className="flex px-2">
                {/* paises */}
            <div className={`w-full pb-2 ${show === "countries" ? "select-with-transition" : "select-visible"}`}>
                {show === "countries" ? (
                    <select
                            value={selectedCountry}
                            onChange={handleCountryChange}
                            className={show === "countries" ? "select-with-transition w-60" : "select-visible"}
                    >
                        <option value="">Selecciona país</option>
                        {countries.map((country) => (
                            <option
                                key={country.country_name}
                                value={country.country_name}
                            >
                                {country.country_name}
                            </option>
                        ))}
                    </select>
                ) : null}
            </div>

            {/* estados */}
            <div className={`w-full pb-2 ${show === "states" ? "select-with-transition" : "select-visible"}`}>
                {show === "states" ? (
                    <select
                        value={selectedState}
                        onChange={handleStateChange}
                        className={show === "states" ? "select-with-transition" : "select-visible"}
                    >
                        <option value="">Selecciona estado</option>
                        {states.map((state) => (
                            <option key={state.state_name} value={state.state_name}>
                                {state.state_name}
                            </option>
                        ))}
                    </select>
                ) : null}
            </div>

            {/* ciudades */}
            <div className={`w-full pb-2 ${show === "cities" ? "select-with-transition" : "select-visible"}`}>
                {show === "cities" ? (
                    <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className={show === "cities" ? "select-with-transition" : "select-visible"}
                >
                    <option value="">Selecciona ciudad</option>
                    {cities.map((city) => (
                        <option key={city.city_name}
                        value={city.city_name}
                        /* onClick={() => handleCityClick(city.city_name)} */
                        onClick={() => handleCityChange}
                        >
                            {city.city_name}
                        </option>
                    ))}
                </select>
                ) : null }
            </div>
            </div>

            <div>
                {show === "cities" ? (
                    <button onClick={handleReset}><BiReset className="text-white w-8 h-8"/></button>
                ): null}
            </div>
        </section>
    </div>
    );
};

export default CountrieOption;
