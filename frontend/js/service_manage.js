import { symbolMap } from "./constants.js";

function convertNotation (expression){
    let covertedExpression = expression

    for(const [symbol, backendNotation] of Object.entries(symbolMap)){
        const regex = new RegExp(`\\${symbol}`, 'g');
        covertedExpression = covertedExpression.replace(regex, backendNotation);
    }
    return covertedExpression;
}



document.getElementById("submit-data").addEventListener("click", function(){
    const form_eq = document.getElementById("equation_form");
    const equations = [];
    const limits = [];

    form_eq.querySelectorAll("input[name^='equation']").forEach(input => {
        equations.push(convertNotation(input.value));
    });

    form_eq.querySelectorAll("input[name^='limit']").forEach(input => {
        limits.push(parseFloat(input.value));
    })

    const formData = {
        equations: equations,
        limits: limits
    };

    console.log(JSON.stringify(formData))
})