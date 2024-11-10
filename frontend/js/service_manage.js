import { symbolMap, METHODS} from "./constants.js";
import { executeRequest } from "./service/mainControl.js";
import { validateFunction, validateLimits, validateTolerance, validateNumeric} from "./validation.js";

function convertNotation(expression) {
    let convertedExpression = expression;
    for (const [symbol, backendNotation] of Object.entries(symbolMap)) {
        const regex = new RegExp(symbol, 'g');
        convertedExpression = convertedExpression.replace(regex, backendNotation);
    }
    return convertedExpression;
}

function latexToFormat(latex) {
    // Reemplazo para fracción \frac{numerador}{denominador}
    latex = latex.replace(/\\frac\{([^}]*)\}\{([^}]*)\}/g, '($1)/($2)');

    // Reemplazo para raíz cuadrada \sqrt{argumento}
    latex = latex.replace(/\\sqrt\{([^}]*)\}/g, 'sqrt($1)');
    latex = latex.replace(/\\sqrt\[(\d+)\]\{([^}]*)\}/g, '($2)**(1/$1)');

    // Reemplazo para potencias con notación ^{}
    latex = latex.replace(/([a-zA-Z0-9\(\)\+\-\*\/]+)\^\{([^}]*)\}/g, '$1**($2)')

    // Reemplazo para potencias con notación simple, como x^2
    latex = latex.replace(/([a-zA-Z0-9]+)\^([a-zA-Z0-9]+)/g, '$1**$2');

    // Reemplazo para funciones trigonométricas y logarítmicas
    latex = latex.replace(/\\(sin|cos|tan|log)\{([^}]*)\}/g, '$1($2)');
    latex = latex.replace(/\\(sin|cos|tan|log)\(([^)]*)\)/g, '$1($2)');

    // Reemplazo para paréntesis \left(...\right) y \left[...\right]
    latex = latex.replace(/\\left\(/g, '(');
    latex = latex.replace(/\\right\)/g, ')');
    latex = latex.replace(/\\left\[/g, '[');
    latex = latex.replace(/\\right\]/g, ']');

    // Manejo de paréntesis de agrupación como \left{ y \right}
    latex = latex.replace(/\\left\{/g, '(').replace(/\\right\}/g, ')');

    // Reemplazo para productos (\cdot)
    latex = latex.replace(/\\cdot/g, '*');

    // Eliminación de backslashes residuales
    latex = latex.replace(/\\/g, '');

    console.log(`funcion veri=${latex}`);
    return latex;
}


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
        const convertedExpression = convertNotation(latex);
        const formattedExpression = latexToFormat(convertedExpression);

        //verificar si es una ecuacion valida
        const {isValid, message} = validateFunction(formattedExpression);
        if(!isValid){
            alert(`Error en la ecuacion: ${message}`);
            hasError = true;
            return;
        }

        equations.push(formattedExpression);
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
