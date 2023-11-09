import { useMemo } from 'react';

const iconsWeather = (icon) => {

    try{
        const iconMap = {
            //dia
            '01d': '/icons/clear-day.svg',
            '02d': '/icons/cloudy.svg',
            '03d': '/icons/partly-cloudy-day.svg',
            '04d': '/icons/overcast-day.svg',
            '09d': '/icons/rain.svg',
            '10d': '/icons/drizzle.svg',
            '11d': '/icons/thunderstorms.svg',
            '13d': '/icons/partly-cloudy-day-snow.svg',
            '50d': '/icons/mist.svg',
            //noche
            '01n': '/icons/clear-night.svg',
            '02n': '/icons/partly-cloudy-night.svg',
            '03n': '/icons/partly-cloudy-night.svg',
            '04n': '/icons/overcast.svg',
            '09n': '/icons/partly-cloudy-night-rain.svg',
            '10n': '/icons/drizzle.svg',
            '11n': '/icons/thunderstorms-night.svg',
            '13n': '/icons/partly-cloudy-night-snow.svg',
            '50n': '/icons/mist.svg',   
        }
        // console.log(icon)
        return iconMap[icon];
    }catch(error){
        console.log(error)
    }

}

export default iconsWeather;