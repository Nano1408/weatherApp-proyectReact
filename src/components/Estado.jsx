import { useEffect, useState } from "react";
import fetcCity from "../helpers/fetchCity"

const Estado = () => {
    const [estados, setEstados] = useState([]);
    const [selectedEstado, setSelectedEstado] = useState("");

  // consultando option paises
  useEffect(() => {
    fetcCity().then((authToken) => {
      const url = "https://www.universal-tutorial.com/api/states/colombia";

      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
          Accept: "application/json",
        },
      };

      // Realizar la solicitud para obtener la lista de estados
      fetch(url, options)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Error en la solicitud estado");
          }
        })
        .then((data) => {
            // console.log(data);
            return data
        })
        .then((data) => {
            // console.log("Datos de la API:", data);
            setEstados(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        })
    });
  }, []);

  return (
    <div className="text-black">
      <select 
        value={selectedEstado}
        onChange={(e) => setSelectedEstado(e.target.value)}
      >
        <option value="">Selecciona</option>
        {estados.map((estado) => (
            <option key={estado.state_name} value={estado.state_name}>
              {estado.state_name}
            </option>
          ))}
      </select>
    </div>
  )
}

export default Estado