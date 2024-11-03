import { symbolMap } from "./constants.js";

function convertNotation(expression) {
    let convertedExpression = expression;
    for (const [symbol, backendNotation] of Object.entries(symbolMap)) {
        const regex = new RegExp(symbol, 'g');
        convertedExpression = convertedExpression.replace(regex, backendNotation);
    }
    return convertedExpression;
}

function latexToFormat(latex) {
    // Reemplazo para la fracción \frac{numerador}{denominador}
    latex = latex.replace(/\\frac\{([^}]*)\}\{([^}]*)\}/g, '($1)/($2)');

    // Reemplazo para la raíz cuadrada \sqrt{argumento}
    latex = latex.replace(/\\sqrt\{([^}]*)\}/g, 'sqrt($1)');

    // Reemplazo de potencias con notación ^{}
    latex = latex.replace(/([a-zA-Z0-9]+)\^\{([^}]*)\}/g, '$1**$2');

    // Reemplazo de potencias con notación simple, como x^2
    latex = latex.replace(/([a-zA-Z0-9]+)\^([a-zA-Z0-9]+)/g, '$1**$2');

    // Reemplazo para funciones trigonométricas y logarítmicas
    latex = latex.replace(/\\(sin|cos|tan|log)\{([^}]*)\}/g, '$1($2)');
    
    // Reemplazo de funciones trigonométricas sin llaves
    latex = latex.replace(/\\(sin|cos|tan|log)\(([^)]*)\)/g, '$1($2)');

    // Reemplazo para paréntesis de LaTeX \left(...\right)
    latex = latex.replace(/\\left\(([^)]*)\\right\)/g, '($1)');
    latex = latex.replace(/\\left\{/g, '{').replace(/\\right\}/g, '}'); // Manejo de llaves

    // Reemplazo para productos
    latex = latex.replace(/\\cdot/g, '*'); // Reemplazo del punto por multiplicación

    // Eliminar el resto de los backslashes
    latex = latex.replace(/\\/g, ''); 

    return latex;
}

document.getElementById("submit-data").addEventListener("click", function(){
    const form_eq = document.getElementById("equation_form");
    const equations = [];
    const limits = [];

    form_eq.querySelectorAll(".mathquill-input").forEach(mathquillContainer => {
        const mathField = MQ.MathField(mathquillContainer);
        const latex = mathField.latex();
        const convertedExpression = convertNotation(latex);
        const formattedExpression = latexToFormat(convertedExpression);
        equations.push(formattedExpression);
    });

    form_eq.querySelectorAll("input[name^='limit']").forEach(input => {
        limits.push(parseFloat(input.value));
    });

    const formData = {
        equations: equations,
        limits: limits
    };

    console.log(JSON.stringify(formData));
});
