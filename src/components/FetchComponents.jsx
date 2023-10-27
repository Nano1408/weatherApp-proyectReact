import { useState, useEffect, useCallback } from "react";
import fetchWeather from "../helpers/fetchWeather";
import fetchMedellin from "../helpers/fetchMedellin";
import fetchBogota from "../helpers/fetchBogota";
import { getGeolocation } from "../helpers/getGeolocation";
import { LuLocateFixed } from "react-icons/lu";
import { MdLocationOn } from "react-icons/md";
import "../App.css";

const FetchComponents = () => {
  const [buscar, setBuscar] = useState("");
  const [geolocation, setGeolocation] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [temp, setTemp] = useState(null);
  const [description, setDescription] = useState(null);
  const [icon, setIcon] = useState(null);
  const [name, setName] = useState("");

  const getWeather = useCallback(() => {
    fetchWeather()
      .then((data) => {
        // Actualiza los estados traidos desde fetchWeather.js con los datos de la API
        setName(data.name);
        setTemp(data.main.temp);
        setDescription(data.weather[0].description);
        setIcon(data.iconUrl);

        console.log(data);
      })
      .catch((error) => {
        console.error("Error al obtener el clima:", error);
      });
    console.log("Se ejecuto callBack");
  });

  const getClimaMedellin = () => {
    fetchMedellin().then((dataMedellin) => {
      setName(dataMedellin.name);
      setTemp(dataMedellin.main.temp);
      setDescription(dataMedellin.weather[0].description);
      setIcon(dataMedellin.iconUrlMedellin);
    });
  };

  const getClimaBogota = () => {
    fetchBogota().then((dataBogota) => {
      setName(dataBogota.name);
      setTemp(dataBogota.main.temp);
      setDescription(dataBogota.weather[0].description);
      setIcon(dataBogota.iconUrlMedellin);
    });
  };

  // useEffect para llamar la api de geolocation
  useEffect(() => {
    getGeolocation()
      .then((name) => {
        setLocationName(name);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // useEffect para la consulta de medellin al cargar la pagina
  useEffect(() => {
    getClimaMedellin();
    console.log("Consultando medellin de primera");
  }, []);

  // evento para buscar dando enter
  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      getWeather(buscar);
      setBuscar("");
    }
  };

  return (
    <div className="w-full pl-1">
      <div className="container-search w-96 mr-auto text-center h-screen flex flex-col items-center justify-center">
        <div className="w-full py-5 flex justify-evenly items-center">
          <input
            type="text"
            name="wheather"
            placeholder="Buscar..."
            id="weather"
            value={buscar}
            className="border-2 rounded-md py-2 pl-2"
            onKeyDown={handleEnterKey}
            onChange={(e) => setBuscar(e.target.value)}
          />
          <button
            className="bg-white rounded-full ml-2 w-10 h-10 flex justify-center items-center"
            onClick={() => {
              getWeather(buscar);
              setBuscar("");
            }}
          >
            {" "}
            <LuLocateFixed className="w-8 h-8 text-black p-1" />
          </button>
        </div>

        {temp !== null && description !== null && (
          <div className="flex flex-col">
            {/* titulo de la ciudad */}
            <h2 className="text-4xl font-bold text-white">{name}</h2>
            {/* icono */}
            <div className="flex justify-center">
              <img src={icon} alt="icon_weather" className="w-60 h-60" />
            </div>

            {/* texto información clima */}
            <div>
              <p>
                <strong className="text-6xl text-white">
                  {temp.toFixed()}
                </strong>
                <span className="text-2xl font-semibold text-white">°C</span>
              </p>
              <p className="my-4 text-3xl font-medium text-white">
                {description}
              </p>
            </div>
          </div>
        )}

        <div className="mt-5">
          <button
            onClick={() => getClimaMedellin()}
            className="mr-3 bg-stone-100 text-black font-semibold pt-2 pb-2 pr-5 pl-5 rounded-sm hover:bg-red-600 hover:text-white"
          >
            Clima Medellín
          </button>
          <button
            onClick={() => getClimaBogota()}
            className=" bg-slate-800 font-semibold text-white pt-2 pb-2 pr-5 pl-5 rounded-sm hover:bg-red-600"
          >
            Clima Bogotá
          </button>
        </div>

        {locationName && (
          <div className="mt-7 flex">
            <h2 className="text-white text-lg flex items-center">
              Ubicación activada  
              <MdLocationOn className="text-red-500"/> 
              {locationName}
            </h2>
            {/* También puedes mostrar la latitud y longitud si es necesario */}
            {/* <p>Latitud: {geolocation.latitude}</p> */}
            {/* <p>Longitud: {geolocation.longitude}</p> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default FetchComponents;
