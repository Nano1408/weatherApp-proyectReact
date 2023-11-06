import { useState, useEffect } from "react";
import fetchPronostic from "../helpers/fetchPronostic";
import { FaSearchLocation } from "react-icons/fa";

const Pronostics = () => {
  const [forecastData, setForecastData] = useState("");
  const [buscar, setBuscar] = useState("");
  // const [loading, setLoading] = useState(true);

  // Función para obtener el pronóstico y actualizar el estado
  const obtenerPronostico = async () => {
    try {
      const pronostico = await fetchPronostic();
      console.log("Pronóstico actualizado:", pronostico);
      setForecastData(pronostico);
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
    const dias = obtenerNombreDias(fechaDate.getDay())
    // const hora = fechaDate.getHours();
    // const minuto = fechaDate.getMinutes();
  
    return `${dias}, ${mes} ${dia}`;
  };
  
  // Función para obtener el nombre del mes
  const obtenerNombreMes = (mes) => {
    const nombresMeses = [
      "Ene", "Feb", "Mar", "Abr", "May", "Jun",
      "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"
    ];
  
    return nombresMeses[mes];
  };

  const obtenerNombreDias = (dia) => {
    const nombresDias = [
      "Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"
    ];
  
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
  const obtenerPronosticoParaUbicacion = async (ubicacion) => {
    try {
      const pronostico = await fetchPronostic(ubicacion);
      const pronosticoDiaSig = pronosticIndex(8);
      const pronosticoHorasSig = pronosticIndex(1);
      const pronosticoDosDiasSig = pronosticIndex(16);
      const pronosticoTresDiasSig = pronosticIndex(24);

      pronosticoDiaSiguiente = pronosticoDiaSig;
      pronosticoDiaHorasSiguientes = pronosticoHorasSig;
      pronosticoDosDiasSiguientes = pronosticoDosDiasSig;
      pronosticoTresDiasSiguiente = pronosticoTresDiasSig;

      console.log("Pronóstico actualizado para", ubicacion, ":", pronostico);
      setForecastData(pronostico);
    } catch (error) {
      console.error(
        "Error al actualizar el pronóstico para",
        ubicacion,
        ":",
        error
      );
    }
  };

  const pronosticoDiaHorasSiguientes = pronosticIndex(1);
  const pronosticoDiaSiguiente = pronosticIndex(8);
  const pronosticoDosDiasSiguientes = pronosticIndex(16);
  const pronosticoTresDiasSiguiente = pronosticIndex(24);

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      obtenerPronosticoParaUbicacion(buscar);
      setBuscar("");
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
          onChange={(e) => setBuscar(e.target.value)}
        />

        <button
          onClick={() => {
            obtenerPronosticoParaUbicacion(buscar), setBuscar("");
          }}
          className="text-white flex justify-center items-center"
        >
          <FaSearchLocation className="w-7 h-7 hover:text-red-600 hover:scale-110 hover:duration-300 duration-300" />
        </button>
      </div>

      {pronosticoDiaSiguiente && (
        <div className="text-white mt-10 flex justify-evenly flex-wrap">

          {/* pronostico siguientes 8 horas */}
          <div className="w-40 h-60 flex flex-col items-center justify-center bg-slate-900 my-2 mx-1">
            <h3 className="font-semibold text-xl">{obtenerFechaFormateada(pronosticoDiaHorasSiguientes.datePronostic)}</h3>
            <p className="font-semibold text-xs tex">8 horas</p>
            <img
              src={`https://openweathermap.org/img/wn/${pronosticoDiaHorasSiguientes.icono}@2x.png`}
              alt="Icono del tiempo"
            />
            <h2 className="font-bold text-gray-400">
              {pronosticoDiaHorasSiguientes.description}
            </h2>
            <div className="w-full flex justify-evenly mt-3 font-bold">
              <p>{pronosticoDiaHorasSiguientes.tempMin} °C</p>
              <p className="text-slate-600">
                {pronosticoDiaHorasSiguientes.tempMax} °C
              </p>
            </div>
          </div>

          {/* pronostico dia siguiente */}
          <div className="w-40 h-60 flex flex-col items-center justify-center bg-slate-900 my-2 mx-1">
            <h3 className="font-semibold text-xl">{obtenerFechaFormateada(pronosticoDiaSiguiente.datePronostic)}</h3>
            <p className="font-semibold text-xs tex">Mañana</p>
            <img
              src={`https://openweathermap.org/img/wn/${pronosticoDiaSiguiente.icono}@2x.png`}
              alt="Icono del tiempo"
            />
            <h2 className="font-bold text-gray-400">
              {pronosticoDiaSiguiente.description}
            </h2>
            <div className="w-full flex justify-evenly mt-3 font-bold">
              <p>{pronosticoDiaSiguiente.tempMin} °C</p>
              <p className="text-slate-600">
                {pronosticoDiaSiguiente.tempMax} °C
              </p>
            </div>
          </div>

          {/* pronostico dos dias siguientes */}
          <div className="w-40 h-60 flex flex-col items-center justify-center bg-slate-900 my-2 mx-1">
            <h3 className="font-semibold text-xl">{obtenerFechaFormateada(pronosticoDosDiasSiguientes.datePronostic)}</h3>
            <p className="font-semibold text-xs tex">2 días</p>
            <img
              src={`https://openweathermap.org/img/wn/${pronosticoDosDiasSiguientes.icono}@2x.png`}
              alt="Icono del tiempo"
            />
            <h2 className="font-bold text-gray-400">
              {pronosticoDosDiasSiguientes.description}
            </h2>
            <div className="w-full flex justify-evenly mt-3 font-bold">
              <p>{pronosticoDosDiasSiguientes.tempMin} °C</p>
              <p className="text-slate-600">
                {pronosticoDosDiasSiguientes.tempMax} °C
              </p>
            </div>
          </div>

          {/* pronostico tres dias siguientes */}
          <div className="w-40 h-60 flex flex-col items-center justify-center bg-slate-900 my-2 mx-1">
            <h3 className="font-semibold text-xl">{obtenerFechaFormateada(pronosticoTresDiasSiguiente.datePronostic)}</h3>
            <p className="font-semibold text-xs tex">3 días</p>
            <img
              src={`https://openweathermap.org/img/wn/${pronosticoTresDiasSiguiente.icono}@2x.png`}
              alt="Icono del tiempo"
            />
            <h2 className="font-bold text-gray-400">
              {pronosticoTresDiasSiguiente.description}
            </h2>
            <div className="w-full flex justify-evenly mt-3 font-bold">
              <p>{pronosticoTresDiasSiguiente.tempMin} °C</p>
              <p className="text-slate-600">
                {pronosticoTresDiasSiguiente.tempMax} °C
              </p>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

export default Pronostics;
