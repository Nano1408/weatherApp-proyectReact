export const fetchCountries = (auth_token) => {
    const apiInitial = "https://www.universal-tutorial.com/api"

    return fetch(`${apiInitial}/countries/`, {
        method: 'GET',
        headers: { // Utiliza la propiedad "headers" en lugar de "Authorization"
            Authorization: `Bearer ${auth_token}`,
            Accept: 'application/json',
        },
    })
    .then(res => res.json('auth_token'))
    .then(countData => {return countData})
}

export const fetchState = (auth_token, countries) => {
    return fetch(`https://www.universal-tutorial.com/api/states/${countries}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${auth_token}`,
            Accept: 'application/json',
        }
    })
    .then(res => res.json())
    .then(stateData => {return stateData})
}

export const fecthCities = (auth_token, states) => {
    return fetch(`https://www.universal-tutorial.com/api/cities/${states}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${auth_token}`,
            Accept: 'application/json',
        }
    })
    .then(res => res.json())
    .then(citiesData => {return citiesData})
}