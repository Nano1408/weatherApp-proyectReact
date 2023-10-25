const fetchWeather = async () => {
	const apiKey = '82ee77e2a6ad43f12b2de1788801e76b'
	const queryCity = document.getElementById('weather').value;
	const URL = `https://api.openweathermap.org/data/2.5/weather?q=${queryCity}&appid=${apiKey}&lang=es&units=metric`;
	

	if(queryCity ==''){
        alert('Por favor escribe al menos una ciudad...');
        return null
    }


	try {
		const response = await fetch(URL);
		const result = await response.json();
		
		if (result.weather && result.weather.length > 0) {
            // Agrega la URL del icono al objeto de respuesta
            result.iconUrl = `https://openweathermap.org/img/wn/${result.weather[0].icon}@4x.png`;
        }
		return result

	} catch (error) {
		console.log(error)
		throw error;
	}

}


export default fetchWeather