import { useMemo } from 'react';

const iconsWeather = (icon) => {

    try{
        const iconMap = {
            //dia
            '01d': './public/icons/clear-day.svg',
            '02d': '/public/icons/cloudy.svg',
            '03d': '/public/icons/partly-cloudy-day.svg',
            '04d': '/public/icons/overcast-day.svg',
            '09d': '/public/icons/rain.svg',
            '10d': '/public/icons/drizzle.svg',
            '11d': 'public/icons/thunderstorms.svg',
            '13d': '/public/icons/partly-cloudy-day-snow.svg',
            '50d': '/public/icons/mist.svg',
            //noche
            '01n': '/public/icons/clear-night.svg',
            '02n': '/public/icons/partly-cloudy-night.svg',
            '03n': '/public/icons/partly-cloudy-night.svg',
            '04n': '/public/icons/overcast.svg',
            '09n': '/public/icons/partly-cloudy-night-rain.svg',
            '10n': '/public/icons/drizzle.svg',
            '11n': '/public/icons/thunderstorms-night.svg',
            '13n': '/public/icons/partly-cloudy-night-snow.svg',
            '50n': '/public/icons/mist.svg',   
        }
        console.log(icon)
        return iconMap[icon];
    }catch(error){
        console.log(error)
    }

}

export default iconsWeather;