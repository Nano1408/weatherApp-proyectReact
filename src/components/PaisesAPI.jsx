import { useEffect, useState } from "react";
import fetcCity from "../helpers/fetchCity"

const PaisesAPI = () => {
    const [paises, setPaises] = useState([]);
    const [selectedpais, setSelectedpais] = useState("");

    // consultando option paises
  useEffect(() => {
    fetcCity().then((authToken) => {
      const url = "https://www.universal-tutorial.com/api/countries";

      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
          Accept: "application/json",
        },
      };

      // Realizar la solicitud para obtener la lista de países
      fetch(url, options)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Error en la solicitud de países");
          }
        })
        .then((data) => {
            console.log(data);
            return data
        })
        .then((data) => {
            console.log("Datos de la API:", data);
            setPaises(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        })
    });
  }, []);

  return (
    <div className="text-black">
        <select 
        value={selectedpais}
        onChange={(e) => setSelectedpais(e.target.value)}
      >
        <option value="">Selecciona pais</option>
        {paises.map((pais) => (
            <option key={pais.countru_name} value={pais.countru_name}>
              {pais.state_name}
            </option>
          ))}
      </select>
    </div>
  )
}

export default PaisesAPI