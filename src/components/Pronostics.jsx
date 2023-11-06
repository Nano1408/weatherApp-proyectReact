import { useState, useEffect } from "react";
import fetchPronostic from "../helpers/fetchPronostic";
import { FaSearchLocation } from "react-icons/fa";
import { FaLocationPinLock } from "react-icons/fa6";

const Pronostics = () => {
  const [forecastData, setForecastData] = useState(null);
  const [buscar, setBuscar] = useState("");
  const [loading, setLoading] = useState(true);

  // Función para obtener el pronóstico y actualizar el estado
  const obtenerPronostico = async () => {
    try {
      const pronostico = await fetchPronostic();
      console.log("Pronóstico actualizado:", pronostico);
      setForecastData(pronostico);
      setLoading(false);
    } catch (error) {
      console.error("Error al actualizar el pronóstico:", error);
    }
  };

  // Función para obtener el pronóstico del día siguiente
  const pronosticIndex = (index) => {
    if (forecastData && forecastData.list.length >= index) {
      const pronostico = forecastData.list[index];
      const datePronostic = pronostico.dt_txt;
      return {
        // datePronostic: pronostico.dt_txt,
        datePronostic: datePronostic,
        tempMin: pronostico.main.temp_min.toFixed(),
        tempMax: pronostico.main.temp_max.toFixed(1),
        description: pronostico.weather[0].description,
        name: forecastData.city.name,
        icono: pronostico.weather[0].icon,
      };
    }
    return "no fue posible traer los datos de forecast", null;
  };

  const obtenerFechaFormateada = (fecha) => {
    if (!fecha) {
      return "Fecha desconocida";
    }
    const fechaDate = new Date(fecha);

    if (isNaN(fechaDate)) {
      return "Fecha desconocida";
    }

    const dia = fechaDate.getDate(-1);
    const mes = obtenerNombreMes(fechaDate.getMonth());
    const dias = obtenerNombreDias(fechaDate.getDay());
    // const hora = fechaDate.getHours();
    // const minuto = fechaDate.getMinutes();

    return `${dias}, ${mes} ${dia}`;
  };

  // Función para obtener el nombre del mes
  const obtenerNombreMes = (mes) => {
    const nombresMeses = [
      "Ene", "Feb","Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dic",
    ];

    return nombresMeses[mes];
  };

  const obtenerNombreDias = (dia) => {
    const nombresDias = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];

    return nombresDias[dia];
  };

  // Efecto para actualizar el pronóstico periódicamente
  useEffect(() => {
    obtenerPronostico();
    const intervaloActualizacion = 30 * 60 * 1000; // 30 minutos
    const intervalId = setInterval(obtenerPronostico, intervaloActualizacion);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Manejar la obtención del pronóstico de diferentes ubicaciones
  const actualizarPronostico = async (cityName) => {
    try {
      const pronostico = await fetchPronostic(cityName);
      console.log("Pronóstico actualizado para", cityName, ":", pronostico);
      setForecastData(pronostico);
      setLoading(false);
    } catch (error) {
      console.error(
        "Error al actualizar el pronóstico para", cityName,
        ":",
        error
      );
    }
  };

  // Efecto para actualizar las cards cuando forecastData cambie
  useEffect(() => {
    // Verifica si hay datos de pronóstico
    if (forecastData) {
      setLoading(false);
    }
  }, [forecastData]);

  
  const handleInputChange = (e) => {
    setBuscar(e.target.value);
  };
  
  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      actualizarPronostico(buscar);
      setLoading(true);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full flex justify-center mt-10">
        <input
          type="text"
          name="forecast"
          placeholder="Buscar pronostico..."
          id="forecast"
          value={buscar}
          className="border-2 rounded-md py-2 pl-2 mr-5 w-1/2"
          onKeyDown={handleEnterKey}
          onChange={handleInputChange}
        />

        <button
          onClick={() => {
            actualizarPronostico(buscar);
            setLoading(true);
          }}
          className="text-white flex justify-center items-center"
        >
          <FaSearchLocation className="w-7 h-7 hover:text-red-600 hover:scale-110 hover:duration-300 duration-300" />
        </button>
      </div>

      {loading ? (
        <div className="w-full flex flex-col items-center mt-5">
          {/* <span class="loader loader-calc"></span> */}
          <FaLocationPinLock className="icon-with-bounce-animation text-red-600 w-10 h-10 my-3"/>
        </div>

        ) : forecastData ? (
          <div className="text-white mt-10 flex justify-evenly flex-wrap">

            {/* pronostico siguientes 8 horas */}
            <div className="w-40 h-60 flex flex-col items-center justify-center bg-slate-900 my-2 mx-1">
              <h3 className="font-semibold text-xl">
                {obtenerFechaFormateada(
                  forecastData.list[1].dt_txt
                )}
              </h3>
              <p className="font-semibold text-xs tex">8 horas</p>
              <img
                src={`https://openweathermap.org/img/wn/${forecastData.list[1].weather[0].icon}@2x.png`}
                alt="Icono del tiempo"
              />
              <h2 className="font-bold text-gray-400">
                {forecastData.list[1].weather[0].description}
              </h2>
              <div className="w-full flex justify-evenly mt-3 font-bold">
                <p>{forecastData.list[1].main.temp_min.toFixed()} °C</p>
                <p className="text-slate-600">
                  {forecastData.list[1].main.temp_max.toFixed(1)} °C
                </p>
              </div>
            </div>

            {/* pronostico dia siguiente */}
            <div className="w-40 h-60 flex flex-col items-center justify-center bg-slate-900 my-2 mx-1">
              <h3 className="font-semibold text-xl">
                {obtenerFechaFormateada(
                  forecastData.list[8].dt_txt
                )}
              </h3>
              <p className="font-semibold text-xs tex">Mañana</p>
              <img
                src={`https://openweathermap.org/img/wn/${forecastData.list[8].weather[0].icon}@2x.png`}
                alt="Icono del tiempo"
              />
              <h2 className="font-bold text-gray-400">
                {forecastData.list[8].weather[0].description}
              </h2>
              <div className="w-full flex justify-evenly mt-3 font-bold">
                <p>{forecastData.list[8].main.temp_min.toFixed()} °C</p>
                <p className="text-slate-600">
                  {forecastData.list[8].main.temp_max.toFixed(1)} °C
                </p>
              </div>
            </div>

            {/* pronostico dos dias siguientes */}
            <div className="w-40 h-60 flex flex-col items-center justify-center bg-slate-900 my-2 mx-1">
              <h3 className="font-semibold text-xl">
                {obtenerFechaFormateada(
                  forecastData.list[16].dt_txt
                )}
              </h3>
              <p className="font-semibold text-xs tex">2 días</p>
              <img
                src={`https://openweathermap.org/img/wn/${forecastData.list[16].weather[0].icon}@2x.png`}
                alt="Icono del tiempo"
              />
              <h2 className="font-bold text-gray-400">
                {forecastData.list[16].weather[0].description}
              </h2>
              <div className="w-full flex justify-evenly mt-3 font-bold">
                <p>{forecastData.list[16].main.temp_min.toFixed()} °C</p>
                <p className="text-slate-600">
                  {forecastData.list[16].main.temp_max.toFixed(1)} °C
                </p>
              </div>
            </div>

            {/* pronostico tres dias siguientes */}
            <div className="w-40 h-60 flex flex-col items-center justify-center bg-slate-900 my-2 mx-1">
              <h3 className="font-semibold text-xl">
                {obtenerFechaFormateada(
                  forecastData.list[24].dt_txt
                )}
              </h3>
              <p className="font-semibold text-xs tex">3 días</p>
              <img
                src={`https://openweathermap.org/img/wn/${forecastData.list[24].weather[0].icon}@2x.png`}
                alt="Icono del tiempo"
              />
              <h2 className="font-bold text-gray-400">
                {forecastData.list[24].weather[0].description}
              </h2>
              <div className="w-full flex justify-evenly mt-3 font-bold">
                <p>{forecastData.list[24].main.temp_min.toFixed()} °C</p>
                <p className="text-slate-600">
                  {forecastData.list[24].main.temp_max.toFixed(1)} °C
                </p>
              </div>
            </div>
          </div>
        ) : null
      }
    </div>
  );
};

export default Pronostics;
