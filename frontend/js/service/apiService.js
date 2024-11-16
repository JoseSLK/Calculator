import { API_BASE_URL, defaultHeaders } from "./config.js";

async function postRequest (endpoint, data) {
    try{
        const response = await fetch(`${API_BASE_URL}${endpoint}`,{
            method: 'POST',
            headers: defaultHeaders,
            body: JSON.stringify(data)
        });

        if (!response.ok){
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error en la solicitud'); 
        }

        return await response.json();
    } catch (error){
        alert(`Error en la llamada del servicio: ${error.message}`)//Este me retorna un mensaje Error en la llamada del servicio: Unexpected token '<', "<!doctype "... is not valid JSON
        throw error;
    }
}

export const apiService = {
    biseccion: (data) => postRequest('/biseccion', data),
    puntofijo: (data) => postRequest('/puntofijo', data),
    secante: (data) => postRequest('/secante', data),
    newtonRaphson: (data) => postRequest('/newton', data),
    broyden: (data) => postRequest('/broyden', data),
    newtonRaphsonSis: (data) => postRequest('/sis_newton', data)

}