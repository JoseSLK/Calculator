import { apiService } from "./apiService.js";
import { iterationsTableFilling } from "../result_table.js"

export function executeRequest (id_method, data){
    switch (id_method) {
        case "1":
            return puntofijo(data);
        case "2":
            return biseccion(data);
        case "3":
            return secante(data);
        case "4":
            return newtonRaphson(data);
        case "5":
            return broyden(data);
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

async function secante(data){

    let minLimit = parseFloat(data.limits[0]);
    let supLimit = parseFloat(data.limits[1]);

    let tol = parseFloat(data.tolerance);

    const dataBack = {
        function: data.equations[0],
        initial_point_a: minLimit,
        initial_point_b: supLimit,
        tolerance: tol
    }

    try{
        const response = await apiService.secante(dataBack);
        const result = response.resultado;
        const container = resultCute(result);

        if(response.grafica){
            const img = document.createElement('img');
            img.src = `data:image/png;base64,${response.grafica}`;
            img.alt = "Resultado grafica secante";
            img.style.width = '100%';
            container.appendChild(img);
        }

        iterationsTableFilling(response.iteracion, container);
        
    } catch (error){
        resultCute("Hubo un error al calcular la solucion usando el metodo secante")
    }
}
async function newtonRaphson (data){

    let limit = parseFloat(data.limits[0])

    let tol = parseFloat(data.tolerance);

    const dataBack = {
        function: data.equations[0],
        fprima: data.equations[1],
        p0: limit,
        tolerance: tol
    }

    try{
        const response = await apiService.newtonRaphson(dataBack);
        const result = response.resultado;
        const container = resultCute(result)

        if(response.grafica){
            const img = document.createElement('img');
            img.src = `data:image/png;base64,${response.grafica}`;
            img.alt = "Resultado grafica secante";
            img.style.width = '100%';
            container.appendChild(img);
        }

        iterationsTableFilling(response.iteracion, container);

    }catch (error) {
        resultCute("Hubo un error al calcular la solucion usando el metodo Newton Raphson")
    } 
}

async function broyden(data){
    let tol = parseFloat(data.tolerance);

    const dataBack = {
        function: data.equations,
        initial_point: data.limits,
        tolerance: tol
    }
    console.log("Esto va al back")
    console.log(dataBack)

    try{
        const response = await apiService.broyden(dataBack);
        console.log(response.mensaje);
        const result = response.resultado;
        const container = resultCute(result);

        iterationsTableFilling(response.iteracion, container, true);
    }catch (error) {

        resultCute("Hubo un error al calcular la solucion usando el metodo Broyden");
        
    }
}

// async function newtonRaphsonSis(data){

// }
