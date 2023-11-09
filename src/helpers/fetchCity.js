const apiKey = 'ktjAiW7czMOiqxmiMjneao6mYN_3NVmy_rjBOYW2hA_p3gHh53BrpyLYNf7AbGBbatY';
const email = 'fernandowjose2000@gmail.com';

const fetcCity = () => {
    const url = 'https://www.universal-tutorial.com/api/getaccesstoken';

  const options = {
    method: 'GET',
    headers: {
      "Accept": "application/json",
      "api-token": apiKey,
      "user-email": email
    }
  };

  return fetch(url, options)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Error al obtener el token de autorización');
    }
  })
  .then((data) => {
    return data.auth_token;
  });
}


export default fetcCity