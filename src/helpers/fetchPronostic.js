const fetcPronostic = async () => {
    const apiKey = "82ee77e2a6ad43f12b2de1788801e76b";

  if ("geolocation" in navigator) {

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const cityName = document.getElementById('forecast').value;
        let URL = '';

        if (cityName) {
            // Si se proporciona un nombre de ciudad, usamos esa opción
            URL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&lang=es&units=metric`;
        } else {
            // Si no se proporciona un nombre de ciudad, utilizamos la geolocalización
            URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=es&units=metric`;
        }

        try {
            const res = await fetch(URL);
            const data = await res.json();

            if (data.cod === "200") {
              // extraemos las coordenadas de la ciudad
                const cityCoordinates = {
                lat: data.city.coord.lat,
                lon: data.city.coord.lon,
            };

            // extraer el pronóstico, por ejemplo, el primer elemento de la lista
            const forecast = data.list[0];

            // Agregamos las coordenadas y el pronóstico al objeto de respuesta
            data.cityCoordinates = cityCoordinates;
            data.forecast = forecast;

            resolve(data);
            } else {
                reject("Error en la respuesta de la API de OpenWeather");
            }
        } catch (error) {
            console.error(error);
            reject(error);
        }
    });
    });
    } else {
    console.error("Geolocalización no está disponible en este dispositivo.");
    return Promise.reject("Geolocalización no está disponible en este dispositivo.");
}
};

export default fetcPronostic;
