import { executeRequest } from "./service/mainControl.js";
import {validateLimits, validateTolerance, validateNumeric} from "./validation.js";

document.getElementById("submit-data").addEventListener("click", function(){
    const form_eq = document.getElementById("equation_form");
    const selectValue = document.getElementById("s_method").value;
    const equations = [];
    const limits = [];
    let tolerance = 0;
    let hasError = false;
    
    tolerance = document.getElementById("tolerance").value;
    if (tolerance){
        console.log(`par=${parseFloat(tolerance)}`)
        const {isValid: isToleranceValid, message: toleranceMessage} = validateTolerance(parseFloat(tolerance));
        if(!isToleranceValid){
            alert(`Error en la toleracia: ${toleranceMessage}`);
            hasError = true;
            return;
        }  
    }else {
        alert("La tolerancia es un campo obligatorio.");
        hasError = true;
    }
    
    if(selectValue === "7" || selectValue === "8"){
        const numEquations = parseInt(document.getElementsByName("nequations")[0].value, 10);
        if (!numEquations || numEquations < 1 || numEquations > 8) {
            alert("Por favor, ingresa un número válido de ecuaciones (entre 1 y 8).");
            hasError = true;
            return;
        }

        const matrix = [];
        const initialVector = [];

        // Extraer la matriz de coeficientes y términos independientes
        for (let i = 1; i <= numEquations; i++) {
            const row = [];
            for (let j = 1; j <= numEquations; j++) {
                const coefInput = document.querySelector(`input[name='coef_${i}_${j}']`);
                if (coefInput && coefInput.value) {
                    const coefValue = parseFloat(coefInput.value);
                    const { isValid, message } = validateNumeric(coefValue);
                    if (!isValid) {
                        alert(`Error en coeficiente x${j} de la ecuación ${i}: ${message}`);
                        hasError = true;
                        return;
                    }
                    row.push(coefValue);
                } else {
                    alert(`Falta el valor del coeficiente x${j} en la ecuación ${i}.`);
                    hasError = true;
                    return;
                }
            }

            // Agregar término independiente
            const independentInput = document.querySelector(`input[name='independent_${i}']`);
            if (independentInput && independentInput.value) {
                const independentValue = parseFloat(independentInput.value);
                const { isValid, message } = validateNumeric(independentValue);
                if (!isValid) {
                    alert(`Error en el término independiente de la ecuación ${i}: ${message}`);
                    hasError = true;
                    return;
                }
                row.push(independentValue);
            } else {
                alert(`Falta el término independiente de la ecuación ${i}.`);
                hasError = true;
                return;
            }

            matrix.push(row);
        }

        // Extraer el vector inicial
        for (let k = 1; k <= numEquations; k++) {
            const vectorInput = document.querySelector(`input[name='initial_vector_${k}']`);
            if (vectorInput && vectorInput.value) {
                const vectorValue = parseFloat(vectorInput.value);
                const { isValid, message } = validateNumeric(vectorValue);
                if (!isValid) {
                    alert(`Error en el valor inicial para x${k}: ${message}`);
                    hasError = true;
                    return;
                }
                initialVector.push(vectorValue);
            } else {
                alert(`Falta el valor inicial para x${k}.`);
                hasError = true;
                return;
            }
        }

        if (hasError) {
            return;
        }

        // Estructurar los datos para los métodos 7 y 8
        const formData = {
            function: matrix,
            x0: initialVector,
            tolerance: parseFloat(tolerance)
        };

        console.log("Datos enviados:", JSON.stringify(formData));
        executeRequest(selectValue, formData);

    }else{
        form_eq.querySelectorAll(".mathquill-input").forEach(mathquillContainer => {
            const mathField = MQ.MathField(mathquillContainer);
            const latex = mathField.latex();
            console.log(`EQ: ${latex}`)

            const d64 = btoa(latex);
            console.log(`EQD64: ${d64}`)

            equations.push(d64);
        });

        form_eq.querySelectorAll("input[name^='limit']").forEach(input => {
            if(input.value) {
                const limit = parseFloat(input.value);
                const {isValid, message} = validateNumeric(limit)
                if(!isValid){
                    alert(`Error en el limite: ${message}`)
                    hasError = true;
                    return;
                }else {
                    limits.push(limit);
                }
            }else {
                alert("Todos los límites son campos obligatorios.");
                hasError = true;
            }
        });

        if(hasError){
            return;
        }

        const formData = {
            equations: equations,
            limits: limits,
            tolerance: tolerance
        };

        console.log(JSON.stringify(formData));
        executeRequest(selectValue,formData);
    }
});
