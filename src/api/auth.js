export const fetchAccesToken = () => { 
    return fetch("https://www.universal-tutorial.com/api/getaccesstoken", {
        method: 'GET',
        headers: {
            Accept: 'aplication/json',
            "api-token": 'ktjAiW7czMOiqxmiMjneao6mYN_3NVmy_rjBOYW2hA_p3gHh53BrpyLYNf7AbGBbatY',
            "user-email": "fernandowjose2000@gmail.com",
        }
    })
    .then(res => res.json())
    .then(data => {
        if(data.auth_token){
            return data.auth_token
        }else{
            throw new Error('No se pudo optener el token temporal')
        }
    })
}