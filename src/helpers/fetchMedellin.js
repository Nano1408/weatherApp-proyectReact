const fetchMedellin = async () => {
    const apiKey = '82ee77e2a6ad43f12b2de1788801e76b'
    const City = 'Medellin';
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${apiKey}&lang=es&units=metric`;

    try{
        const res = await fetch(URL);
        const result = await res.json();

        if(result.weather && result.weather.length > 0){
            result.iconUrlMedellin = `https://openweathermap.org/img/wn/${result.weather[0].icon}.png`;
        }
    return result
    }catch(error){
        console.log(error)
		throw error;
    }
}

export default fetchMedellin