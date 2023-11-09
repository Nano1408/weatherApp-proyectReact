import { useMemo } from 'react';

const iconsWeather = (icon) => {

    try{
        const iconMap = {
            //dia
            '01d': '/icons/01d.svg',
            '02d': '/icons/02d.svg',
            '03d': '/icons/03d.svg',
            '04d': '/icons/04d.svg',
            '09d': '/icons/09d.svg',
            '10d': '/icons/10d.svg',
            '11d': '/icons/11d.svg',
            '13d': '/icons/13d.svg',
            '50d': '/icons/50d.svg',
            //noche
            '01n': '/icons/01n.svg',
            '02n': '/icons/02n.svg',
            '03n': '/icons/03n.svg',
            '04n': '/icons/04n.svg',
            '09n': '/icons/09n.svg',
            '10n': '/icons/10n.svg',
            '11n': '/icons/11n.svg',
            '13n': '/icons/13n.svg',
            '50n': '/icons/50n.svg',  
        }
        // console.log(icon)
        return iconMap[icon];
    }catch(error){
        console.log(error)
    }

}

export default iconsWeather;