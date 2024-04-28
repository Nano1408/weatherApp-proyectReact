import { useState, useEffect, useMemo } from "react";
import DataDay from "./DataDay";
import CountrieOption from "./CountrieOption";
import fetchWeather from "../helpers/fetchWeather";
import Pronostics from "./Pronostics";
import fetchMedellin from "../helpers/fetchMedellin";
import fetchBogota from "../helpers/fetchBogota";
import BackgroundWeather from "../helpers/BackgroundWeather";
import iconsWeather from "../helpers/iconsWeather";
import { getGeolocation } from "../helpers/getGeolocation";
import { LuLocateFixed } from "react-icons/lu";
import { MdLocationOn, MdOutlineSpeed } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6"
import "../App.css";

const FetchComponents = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [showNoDataAlert, setShowNoDataAlert] = useState(false);
  const [locationName, setLocationName] = useState("");
  const [search, setSearch] = useState({ buscar: "", backgroundImage: null, });
  const [loadingAndLocation, setLoadingAndLocation] = useState({ isLoading: false, isLoadingInitial: true, showNoDataAlert: false, locationPermissionDenied: false, })
  const [humidity, setHumidity] = useState(0);

  const getWeatherData = (query) => {
    setLoadingAndLocation((prevState) => ({...prevState, isLoading:true}));
    setLoadingAndLocation((prevState) => ({...prevState, isLoadingInitial:false})); //al cargar la pagina desaparece
    console.log("isLoadingInitial después de setIsLoadingInitial(false):", loadingAndLocation.isLoadingInitial);

    fetchWeather(query)
      .then((data) => {
        setWeatherData(data);
        setHumidity(data.main.humidity);
        setShowNoDataAlert(false);
        setLoadingAndLocation((prevState) => ({...prevState, isLoading:false}));
        setLoadingAndLocation((prevState) => ({...prevState, isLoadingInitial:false}));
      })
      .catch((error) => {
        setWeatherData(null);
        setShowNoDataAlert(true);
        setLoadingAndLocation((prevState) => ({...prevState, isLoading:false}));
        console.error("Error al obtener el clima:", error);
      });
  } ;

  useEffect(() => {
    getGeolocation()
      .then((name) => {
        setLocationName(name);
        setLoadingAndLocation((prevState) => ({...prevState, isLoadingInitial:false}));
      })
      .catch((error) => {
        setLoadingAndLocation((prevState) => ({...prevState, isLoadingInitial:false}));
        setLoadingAndLocation((prevState) => ({...prevState, locationPermissionDenied:true}));
        console.error(error);
      });
  }, []);

  const getClima = (fetchFunction) => {
    setShowNoDataAlert(false); // Oculta la alerta al cargar nueva información
    fetchFunction()
    .then((data) => {
      setWeatherData(data);
      console.log(data)
    })
    .catch((error) => {
      setWeatherData(null);
      setShowNoDataAlert(true);
      console.error("Error al obtener el clima:", error);
    });
  };

  useEffect(() => {
    getClima(fetchMedellin);
  }, []);

  const iconUrl = useMemo(() => {
    if (weatherData) {
      const iconCode = weatherData.weather[0].icon;
      return BackgroundWeather(iconCode, search.backgroundImage);
    }
    return null;
  }, [weatherData, search.backgroundImage]);
  
  useEffect(() => {
    if (iconUrl) {
      document.documentElement.style.setProperty('--background-image-url', `url(${iconUrl})`);
      setSearch({ ...search, backgroundImage: iconUrl });
    }
  }, [iconUrl]);

  const iconSrc = useMemo(() => {
    if (weatherData) {
      return iconsWeather(weatherData.weather[0].icon);
    }
    return null;
  }, [weatherData]);

  // console.log(iconSrc)

  const handleEnterKey = async (e) => {
    if (e.key === "Enter") {
      const newSearch = { ...search, buscar: e.target.value };
      setSearch(newSearch);
      
      try {
        await getWeatherData(newSearch.buscar);
        setSearch({});
      } catch (error) {
        console.log(error)
      }
    }
  };

  const submit = () => {
    if(getWeatherData){
      getWeatherData(search.buscar)
      setSearch({...search, buscar:''})
    }
  }
  

  return (
    <div className="flex h-screen" id="containerFetchComponent">
      <section id="sectionFectComponent"
        className="container-search overflow-y-auto w-[30rem] text-center h-screen flex flex-col items-center justify-center"
      >
        <div className="w-full py-5 flex justify-evenly items-center">
          <input
            type="text"
            name="wheather"
            placeholder="Buscar ciudad..."
            id="weather"
            className="inputFechComponent border-2 rounded-md py-2 pl-2"
            onKeyUp={handleEnterKey}
          />
          <button
            className="bg-white rounded-full ml-2 w-10 h-10 flex justify-center items-center"
            onClick={submit}
          >
            {" "}
            <LuLocateFixed className="w-8 h-8 text-black p-1" />
          </button>
        </div>

        {loadingAndLocation.isLoadingInitial && (
          <span className="loader"></span>
        )}

        {/* Cmponente no terminado, para seleccionar por region o estado */}
        {/* <CountrieOption /> */}

        {loadingAndLocation.isLoading ? (
          <span className="loader"></span>
        ) : weatherData ? (
          <div className="flex flex-col">
            <h2 className="text-4xl font-bold text-white">{weatherData.name}</h2>
            <div className="flex justify-center">
              <img src={iconSrc} alt="icon_weather" className="w-60 h-60 -mb-7" />
              {/* <img src={iconsWeather} alt="" /> */}
            </div>
            <div>
              {/* temperatura minima y temperatura maxima */}
              <div className="flex w-full justify-evenly">
                <p>
                  <strong className="text-4xl text-white">{weatherData.main.temp_min.toFixed()}</strong>
                  <sup className="text-sm text-white -top-7 -mr-6">min</sup>
                  <span className="text-2xl font-semibold text-white"> °C</span>
                </p>
                <p>
                  <strong className="text-4xl text-gray-500">{weatherData.main.temp_max.toFixed()}</strong>
                  <sup className="text-sm text-gray-500 -top-7 -mr-6">max</sup>
                  <span className="text-2xl font-semibold text-gray-500"> °C</span>
                </p>
              </div>
              <p className="my-4 text-3xl font-medium text-white">{weatherData.weather[0].description}</p>
            </div>
          </div>
        ) : null}

        {showNoDataAlert && (
          <div className="bg-[#ffffff11] w-full h-80 justify-center flex flex-col items-center">
            <p className="text-green-50 font-semibold text-xl -mb-14">No se encontraron datos para tu busqueda.</p>
            <img 
              src="icons/404-error.gif" 
              alt="found-404"
            />
          </div>
        )}

        <div className="mt-5">
          <button
            onClick={() => getClima(fetchMedellin)}
            className="clima-med-bog mr-3 bg-stone-100 text-black font-semibold pt-2 pb-2 pr-5 pl-5 rounded-sm hover:bg-red-600 hover:text-white"
          >
            Clima Medellín
          </button>
          <button
            onClick={() => getClima(fetchBogota)}
            className="clima-med-bog bg-slate-800 font-semibold text-white pt-2 pb-2 pr-5 pl-5 rounded-sm hover:bg-red-600"
          >
            Clima Bogotá
          </button>
        </div>

        {/* component de fecha */}
        <DataDay />

        {loadingAndLocation.isLoadingInitial ? (
          <FaLocationDot className="icon-with-bounce-animation text-red-600 w-6 h-6 my-3"/>
        ) : locationName ? (
          <div className="flex">
            <h2 className="text-white text-lg flex items-center pb-2">
              <MdLocationOn className="text-red-500" />
              {locationName}
            </h2>
          </div>
        ) : null}

      </section>

      {/* datos de pronostico al cargar */}
      {loadingAndLocation.isLoadingInitial ? (
        <div className="w-full flex justify-center">
          <span className="loader loader-calc mt-10"></span>
        </div>
      ) :
      <section className="divContSections w-full min-h-screen overflow-y-auto">

        {/* pronostico */}
        <section className="sectcion2Fetcomponet w-full flex flex-col items-center">
          <Pronostics />
          {loadingAndLocation.locationPermissionDenied && (
            <p className="font-semibold text-xl text-amber-400 bg-zinc-950 bg-opacity-50 w-full text-center py-5 px-3">
              Activa la ubicación para mostrar el pronóstico del clima en tu ubicación actual.
            </p>
          )}
        </section>

      {/* medidas de viento y demas */}
      {showNoDataAlert ? (
        <div className="w-full justify-center flex flex-col items-center">
          <p className="text-white font-semibold text-xl mt-10">No se encontraron datos para tu busqueda.</p>
          <img 
            src="icons/404-error.gif" 
            alt="found-404"
          />
      </div>
      ) :
        (
        <section className="sectcion2Fetcomponet sectionCalc w-full px-10">

          <div className=" text-white w-full flex flex-col items-center">
            <h2 className="text-white text-start text-2xl pt-10 pb-5 -ml-[35%]">lo más destacado de hoy</h2>
            {weatherData && (
              <section className="containerSectionEstado grid grid-cols-2 gap-10">

              {/* viento */}
              <div className="bg-[#1E213A] w-[300px] h-[13rem] mb-5 flex flex-col justify-between items-center py-4">
                <p className="text-[#e7e7eb] text-xs">Velocidad del viento</p>
                <h3 className="text-6xl py-3 font-bold">
                  {weatherData.wind.speed.toFixed(1)} 
                  <span className="text-4xl">m/s</span>
                </h3>
                <div className="flex justify-center items-center">
                  <div className="bg-[#FFFFFF4D] rounded-full p-1 text-lg">
                <MdOutlineSpeed />
                  </div>
                <p className="pl-2 text-xs text-[#E7E7EB]">WSW</p>
                </div>
              </div>

              {/* humedad */}
              <div className="bg-[#1E213A] w-[300px] h-[13rem] mb-5 flex flex-col justify-between items-center py-4">
                <p className="text-[#e7e7eb] text-xs">Humedad</p>
                <h3 className="text-6xl py-3 font-bold -mt-2">
                  {weatherData.main.humidity} 
                  <span className="text-4xl">%</span>
                </h3>
                <div className="humidity-bar relative">
                  <div className="flex justify-between w-full absolute -top-6 text-[#A09FB1] text-sm">
                    <span>0</span>
                    <span>50</span>
                    <span>100</span>
                  </div>
                  <div className="progress-bar" style={{ width: `${weatherData.main.humidity}%` }}></div>
                </div>
                <div className="text-end text-xs -mt-8 text-[#A09FB1] w-[70%]"><p>%</p></div>
              </div>

              {/* visibilidad */}
              <div className="bg-[#1E213A] w-[300px] h-[13rem] mb-5 flex flex-col justify-between items-center py-4">
                <p className="text-[#e7e7eb] text-xs">Visibilidad</p>
                <h3 className="text-6xl py-3 font-bold -mt-2">
                  {weatherData.visibility/1000} 
                  <span className="text-4xl">Km</span>
                </h3>
              </div>

              {/* precicion del aire */}
              <div className="bg-[#1E213A] w-[300px] h-[13rem] mb-5 flex flex-col justify-between items-center py-4">
                <p className="text-[#e7e7eb] text-xs">Precision del aire</p>
                <h3 className="text-6xl py-3 font-bold -mt-2">
                  {weatherData.main.pressure} 
                  <span className="text-4xl">hPa</span>
                </h3>
              </div>
            </section>
          )}
        </div>
      </section>
        )
      }

    </section>
      }

    </div>
  );
};

export default FetchComponents;
