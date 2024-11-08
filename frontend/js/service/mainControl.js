import { apiService } from "./apiService.js";

export function executeRequest (id_method, data){
    switch (id_method) {
        case "1":
            return puntofijo(data);
        case "2":
            apiService.biseccion(data);
            break;
        case "3":
            apiService.secante(data);
            break;
        case "4":
            apiService.newtonRaphson(data);
            break;
        case "5":
            apiService.broyden(data);
            break;
        case "6":
            apiService.newtonRaphsonSis(data);
        case "7":
            console.log("Jacobi");
            break;
        case "8":
            console.log("Gauss seidel");
            break;
        default:
            alert("Metodo no encontrado");
    }
}
async function puntofijo(data){

    let point = parseFloat(data.limits[0]);
    
    let tol = parseFloat(data.tolerance);

    const dataBack = {
        function: data.equations[0],
        initial_point: point,
        tolerance: tol
    }
    console.log("---------")
    console.log(JSON.stringify(dataBack))
    console.log("---------")

    const response =  await apiService.puntofijo(dataBack);
    console.log(JSON.stringify(response))
}

function prueba(){
    const dataBack = {
        function: "sqrt((x+5)/2)",
        initial_point: 0,
        tolerance: 0.0008
    }
    const response = apiService.puntofijo(dataBack);
    console.log(JSON.stringify(response))
}
// function biseccion(data){

// }

// function secante(data){

// }
// function newtonRaphson (data){

// }

// function broyden(data){

// }

// function newtonRaphsonSis(data){

// }
