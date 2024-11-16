import { apiService } from "./apiService.js";
import { iterationsTableFilling } from "../result_table.js"

export function executeRequest (id_method, data){
    switch (id_method) {
        case "1":
            return puntofijo(data);
        case "2":
            return biseccion(data)
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

function resultCute( result ){
    const container = document.querySelector(".container_sup_t");
    container.innerHTML = '';

    //Resultado bonito
    const resultHeader = document.createElement('h4');
    resultHeader.classList.add("alert", "alert-primary", "text-center", "mt-3");
    resultHeader.textContent = `El resultado es: ${result}`;
    container.appendChild(resultHeader);

    return container
}
async function puntofijo(data){

    let point = parseFloat(data.limits[0]);
    
    let tol = parseFloat(data.tolerance);

    const dataBack = {
        function: data.equations[0],
        initial_point: point,
        tolerance: tol
    }
    console.log("--------- ANNTES")
    console.log(JSON.stringify(dataBack))
    console.log("---------")

    const response =  await apiService.puntofijo(dataBack);
    console.log(JSON.stringify(response))

    const result = response.resultado;

    const container = resultCute(result)

    if (response.grafica){

        const img = document.createElement('img');
        img.src = `data:image/png;base64,${response.grafica}`
        img.alt = "Resultado grafica punto fijo";
        img.style.width = '100%';

        container.appendChild(img);
    }

    iterationsTableFilling(response.iteracion, container)
}
async function biseccion(data) {

    let minLimit = parseFloat(data.limits[0]);
    let supLimit = parseFloat(data.limits[1]);

    let tol = parseFloat(data.tolerance);

    const dataBack = {
        function: data.equations[0],
        min_limit: minLimit,
        sup_limit: supLimit,
        tolerance: tol
    }

    console.log("--------- ANTES DE ENVIAR A BACKEND")
    console.log(JSON.stringify(dataBack))
    console.log("---------")

    const response = await apiService.biseccion(dataBack);
    console.log(JSON.stringify(response))

    const result = response.resultado;

    const container = resultCute(result)

    if (response.grafica) {
        const img = document.createElement('img');
        img.src = `data:image/png;base64,${response.grafica}`;
        img.alt = "Resultado gráfica bisección";
        img.style.width = '100%';
        container.appendChild(img);
    }

    iterationsTableFilling(response.iteracion, container);
}

// function secante(data){

// }
// function newtonRaphson (data){

// }

// function broyden(data){

// }

// function newtonRaphsonSis(data){

// }
