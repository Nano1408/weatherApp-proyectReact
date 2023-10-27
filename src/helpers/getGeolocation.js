import axios from 'axios';

export async function getGeolocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const apiKey = '7a6e9bffe5784cae81ec5d4c82e23a81';
          const { latitude, longitude } = position.coords;
  
          try {
            const response = await axios.get(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
            );
  
            const { results } = response.data;
            if (results && results.length > 0) {
              const { components } = results[0];
              const locationName = components.city || components.town || components.county;
              resolve(locationName);
            } else {
              reject('No se encontraron resultados de ubicación.');
            }
          } catch (error) {
            reject('Error al obtener el nombre de la ubicación:', error);
          }
        },
        (error) => {
          reject('Error obteniendo la geolocalización:', error);
        }
      );
    } else {
      reject('La geolocalización no está disponible en este navegador.');
    }
  });
}