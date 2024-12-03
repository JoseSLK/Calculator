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

            if (response.status === 400) {
                alert(`Error: ${errorData.error || 'Solicitud inválida'}`);
                return null;
            }

            throw new Error(errorData.message || 'Error en la solicitud'); 
        }

        return await response.json();
    } catch (error){
        alert(`Error en la llamada del servicio: ${error.message}`)
        console.log(`Error en la llamada del servicio: ${error.message}`)
        throw error;
    }
}

export const apiService = {
    biseccion: (data) => postRequest('/biseccion', data),
    puntofijo: (data) => postRequest('/puntofijo', data),
    secante: (data) => postRequest('/secante', data),
    newtonRaphson: (data) => postRequest('/newton', data),
    broyden: (data) => postRequest('/broyden', data),
    newtonRaphsonSis: (data) => postRequest('/sis_newton', data),
    jacobi: (data) => postRequest('/jacobi', data),
    gauss_seidel: (data) => postRequest('/gauss_seidel', data),
    simpson: (data) => postRequest('/simpson', data),
    trapecios: (data) => postRequest('/trapecio', data)
}