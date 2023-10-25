import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import fetchWeather from '../helpers/fetchWeather';
import fetchMedellin from '../helpers/fetchMedellin';
import fetchBogota from '../helpers/fetchBogota'
import '../App.css';

const FetchComponents = () => {
    const [buscar, setBuscar] = useState('');
    const [geolocation, setGeolocation] = useState(null);
    const [locationName, setLocationName] = useState('');
    const [temp, setTemp] = useState(null);
    const [description, setDescription] = useState(null);
    const [icon, setIcon] = useState(null);
    const [name, setName] = useState('');

    const getWeather = useCallback((() => {
        fetchWeather()
                .then((data) => {
                // Actualiza los estados traidos desde fetchWeather.js con los datos de la API
                setName(data.name)
                setTemp(data.main.temp);
                setDescription(data.weather[0].description);
                setIcon(data.iconUrl)

                console.log(data)
                })
                .catch((error) => {
                    console.error('Error al obtener el clima:', error);
                  });
                console.log("Se ejecuto callBack")
    }))

    const getClimaMedellin = (() => {
        fetchMedellin()
                .then((dataMedellin) =>{
                    setName(dataMedellin.name)
                    setTemp(dataMedellin.main.temp);
                    setDescription(dataMedellin.weather[0].description);
                    setIcon(dataMedellin.iconUrlMedellin);
                })
    })

    const getClimaBogota = (() => {
        fetchBogota()
                .then((dataBogota) => {
                    setName(dataBogota.name)
                    setTemp(dataBogota.main.temp);
                    setDescription(dataBogota.weather[0].description);
                    setIcon(dataBogota.iconUrlMedellin);
                })
    })

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              async (position) => {
                const apiKey = '7a6e9bffe5784cae81ec5d4c82e23a81';
                const { latitude, longitude } = position.coords;
                setGeolocation({ latitude, longitude });
      
                try {
                  const response = await axios.get(
                    `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
                  );

                  console.log(response)
      
                  const { results } = response.data;
                  if (results && results.length > 0) {
                    const { components } = results[0];
                    setLocationName(components.city || components.town || components.county);
                  }
                } catch (error) {
                  console.error('Error obteniendo el nombre de la ubicación:', error);
                }
              },
              (error) => {
                console.error('Error obteniendo la geolocalización:', error);
              }
            );
          } else {
            console.error('La geolocalización no está disponible en este navegador.');
          }
      }, []);


    useEffect(() => {
        getClimaMedellin()
        console.log("Consultando medellin de primera")
    },[])

    function getBackgroundClass(icon) {
        const iconClassMap = {
            // dia
        '01d': 'clear-sky-dia',
        '02d': 'few-clouds-dia',
        '03d': 'scattered-clouds-dia',
        '04d': 'broken-clouds-dia',
        '09d': 'shower-rain-dia',
        '10d': 'rain-dia',
        '11d': 'thunderstorm-dia',
        '13d': 'snow-dia',
        '50d': 'mist-dia',
        // noche
        '01n': 'clear-sky-noche',
        '02n': 'few-clouds-noche',
        '03n': 'scattered-clouds-noche',
        '04n': 'broken-clouds-noche',
        '09n': 'shower-rain-noche',
        '10n': 'rain-dia',
        '11n': 'thunderstorm-noche',
        '13n': 'snow-noche',
        '50n': 'mist-noche',
        }
        const backgroundClass = iconClassMap[icon] ;
        console.log('Icon:', icon);
        console.log('Background Class:', backgroundClass);
        return backgroundClass;

    }


  return (
    <div className={`content-container ${getBackgroundClass(icon)}`}>
        <h1>Wheather API</h1>
        <div>
            <input 
                type="text" 
                name='wheather' 
                id='weather'
                value={buscar}
                onChange={(e) => setBuscar(e.target.value)} 
            />
            <button onClick={() => getWeather(buscar)}>Buscar</button>
        </div>

        {temp !== null && description !== null && (
            <div className='flex flex-col items-end'>
                <h2>{name}</h2>
                <p>Temperatura: {temp} °C</p>
                <p>Clima: {description}</p>
                <img src={icon} alt='icon_weather' />
            </div>
        )}

        <div>
            <button onClick={() => getClimaMedellin()} className='mr-4 bg-slate-800 text-white pt-2 pb-2 pr-5 pl-5 rounded-xl hover:bg-slate-950'>Clima Medellín</button>
            <button onClick={() => getClimaBogota()} className=' bg-slate-800 text-white pt-2 pb-2 pr-5 pl-5 rounded-xl hover:bg-slate-950'>Clima Bogotá</button>
        </div>

        {geolocation && (
            <div>
                <h2>Ubicación activada en tu equipo: {locationName}</h2>
                {/* <p>Latitud: {geolocation.latitude}</p>
                <p>Longitud: {geolocation.longitude}</p> */}
            </div>
        )}

    </div>
  )
}

export default FetchComponents