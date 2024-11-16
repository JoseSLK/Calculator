import { symbolMap, METHODS} from "./constants.js";
import { executeRequest } from "./service/mainControl.js";
import { validateFunction, validateLimits, validateTolerance, validateNumeric} from "./validation.js";

document.getElementById("submit-data").addEventListener("click", function(){
    const form_eq = document.getElementById("equation_form");
    const selectValue = document.getElementById("s_method").value;
    const equations = [];
    const limits = [];
    let tolerance = 0;
    let hasError = false;

    try{
        const nequationsValue = document.getElementsByName("nequations")[0].value;
        const nVar = document.getElementsByName("nvar")[0].value;

        if(!nequationsValue){
            alert("Por favor llena el campo de numero de ecuaciones")
        }
    
        if(!nVar){
            alert("Por favor llena el campo de numero de variables")
        }
    }catch(error){

    }
    
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
});
