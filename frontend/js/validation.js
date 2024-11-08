const mathFunctions = ['sin', 'cos', 'tan', 'sqrt', 'log', 'log10', 'exp', 'asin', 'acos', 'atan', 'sinh', 'cosh', 'tanh', 'asinh', 'acosh', 'atanh', 'pi', 'e'];

export function validateFunction(fStr) {
    // Verificar que solo contenga caracteres permitidos
    const allowedChars = new RegExp('^[0-9+\\-*/().x\\s' + mathFunctions.map(func => `|${func}`).join('') + ']+$');
    if (!allowedChars.test(fStr)) {
        return { isValid: false, error: "Contiene caracteres no permitidos o soportados" };
    }

    // Intentar evaluar la expresión en un entorno seguro
    try {
        // Reemplazar `x` por un valor numérico para probar la expresión
        const sanitizedStr = fStr.replace(/x/g, '1');

        // Crear una función de evaluación segura
        const result = new Function(...mathFunctions, `return ${sanitizedStr};`);

        // Pasar las funciones matemáticas para la evaluación
        const mathObj = {
            sin: Math.sin,
            cos: Math.cos,
            tan: Math.tan,
            sqrt: Math.sqrt,
            log: Math.log,
            log10: Math.log10,
            exp: Math.exp,
            asin: Math.asin,
            acos: Math.acos,
            atan: Math.atan,
            sinh: Math.sinh,
            cosh: Math.cosh,
            tanh: Math.tanh,
            asinh: Math.asinh,
            acosh: Math.acosh,
            atanh: Math.atanh,
            pi: Math.PI,
            e: Math.E
        };

        // Llamar la función resultante para validar la sintaxis
        result(...Object.values(mathObj));

    } catch (error) {
        return { isValid: false, error: `Error en la función: ${error.message}` };
    }

    return { isValid: true, error: "" };
}

// Ejemplo de uso
// const inputFunction = "e**-(x**4)";
// const validationResult = validateFunction(inputFunction);
// console.log(validationResult);

// Validación de los límites para el método de bisección
export function validateLimits(a, b) {
    if (a === NaN || b === NaN ){
        return { isValid: false, message: "Llenas los campos de limites" };
    }
    if (typeof a !== 'number' || typeof b !== 'number') {
        return { isValid: false, message: "Los límites deben ser números" };
    }

    if (a >= b) {
        return { isValid: false, message: "El límite inferior debe ser menor que el límite superior" };
    }

    return { isValid: true, message: "" };
}

// Validación de la tolerancia
export function validateTolerance(tol) {
    if(tol === NaN){
        return { isValid: false, message: "La tolerancia esta vacia" };
    }
    if (typeof tol !== 'number') {
        return { isValid: false, message: "La tolerancia debe ser un número." };
    }

    if (tol <= 0) {
        return { isValid: false, message: "La tolerancia debe ser un número positivo" };
    }

    return { isValid: true, message: "" };
}

// Validación numérica general  
export function validateNumeric(value) {
    if (value === NaN){
        return { isValid: false, message: "Hay un campo vacio" };
    }
    if (typeof value !== 'number') {
        return { isValid: false, message: "El valor debe ser numérico." };
    }
    return { isValid: true, message: "" };
}


