import { apiService } from "./apiService.js";
import { iterationsTableFilling, iterationsTableSimpsonTrapecios, iterationsTableTrapecio } from "../result_table.js"

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
            // apiService.newtonRaphsonSis(data);
            alert("Este metodo estara disponible en proximas versiones")
        case "7":
            return jacobi(data);
        case "8":
            return gauss_seidel(data);
        case "9":
            return trapecios(data);
        case "10":
            return simpson(data);
                
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
    // console.log("--------- ANNTES")
    // console.log(JSON.stringify(dataBack))
    // console.log("---------")

    const response =  await apiService.puntofijo(dataBack);
    // console.log(JSON.stringify(response))

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

    // console.log("--------- ANTES DE ENVIAR A BACKEND")
    // console.log(JSON.stringify(dataBack))
    // console.log("---------")
    try {

        const response = await apiService.biseccion(dataBack);
        // console.log(JSON.stringify(response))

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
    } catch (error){
        resultCute("Hubo un error al calcular la solucion usando el metodo NEWTON RAPHSON")
    }
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
    // console.log("Esto va al back")
    // console.log(dataBack)

    try{
        const response = await apiService.broyden(dataBack);
        // console.log(response.mensaje);
        const result = response.resultado;
        const container = resultCute(result);

        iterationsTableFilling(response.iteracion, container, true);
    }catch (error) {

        resultCute("Hubo un error al calcular la solucion usando el metodo Broyden");
        
    }
}

// async function newtonRaphsonSis(data){

// }
async function jacobi(data){
    let tol = parseFloat(data.tolerance);

    const dataBack = {
        function: data.function,
        x0: data.x0,
        tolerance: tol,
        max_iter: data.max_iter
    }

    try{
        const response = await apiService.jacobi(dataBack);
        const result = response.resultado;
        const container = resultCute(result);
        alert(response.mensaje)

        iterationsTableFilling(response.iteracion, container)
    }catch (error) {
        resultCute("Hubo un error al calcular la solucion usando el metodo JACOBI")
    }
    
}

async function gauss_seidel(data){
    let tol = parseFloat(data.tolerance);

    const dataBack = {
        function: data.function,
        x0: data.x0,
        tol: tol,
        max_iter: data.max_iter
    }

    try{
        const response = await apiService.gauss_seidel(dataBack);
        const result = response.resultado;
        const container = resultCute(result);
        alert(response.mensaje)

        iterationsTableFilling(response.iteracion, container)
    }catch (error) {
        resultCute("Hubo un error al calcular la solucion usando el metodo JACOBI")
    }
    
}

async function trapecios(data){

    let a = parseFloat(data.limits[0]);
    let b = parseFloat(data.limits[1]);
    let tramos = parseFloat(data.limits[2]);

    const dataBack = {
        function: data.equations[0],
        a: a,
        b: b,
        tramos: tramos
    }

    try {
        const response = await apiService.trapecios(dataBack);
        const result = response.resultado
        const container = resultCute(result)

        if(response.grafica){
            const img = document.createElement('img');
            img.src = `data:image/png;base64,${response.grafica}`;
            img.alt = "Resultado grafica secante";
            img.style.width = '100%';
            container.appendChild(img);
        }

        iterationsTableTrapecio(response.iteracion, container);
    
    }catch (error){
        resultCute("Hubo un error al calcular el resultado con el metodo de TRAPECIOS")
    }
}
async function simpson(data){
    let a = parseFloat(data.limits[0]);
    let b = parseFloat(data.limits[1]);
    let tramos = parseFloat(data.limits[2]);

    const dataBack = {
        function: data.equations[0],
        a: a,
        b: b,
        tramos: tramos
    }
    // console.log(dataBack)

    try {
        const response = await apiService.simpson(dataBack);
        const result = response.resultado;
        const container = resultCute(result);

        if(response.grafica){
            const img = document.createElement('img');
            img.src = `data:image/png;base64,${response.grafica}`;
            img.alt = "Resultado grafica secante";
            img.style.width = '100%';
            container.appendChild(img);
        }

        alert(response.mensaje)

        iterationsTableSimpsonTrapecios(response.iteracion, container);

    }catch (error) {
        resultCute("Hubo un error al calcular el resultado con el metodo de SIMPSON")
    }
}

