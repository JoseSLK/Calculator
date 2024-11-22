from flask import request, jsonify
from .validation import validate_matrix, validate_vector, validate_tolerance, validate_max_iterations
from ..methods.Gauss_Seidel import gauss_seidel


def gauss_seidel_r():
    """
    Recibe una solicitud JSON con los datos necesarios, valida la entrada y ejecuta el método de Gauss-Seidel.
    """
    data = request.json

    # Validación de la matriz de coeficientes A (despejada)
    valid, error_message = validate_matrix(data.get('A'))
    if not valid:
        return jsonify({"error": f"Matriz A (despejada): {error_message}"}), 400

    # Validación del vector inicial x0
    valid, error_message = validate_vector(data.get('x0'))
    if not valid:
        return jsonify({"error": f"Vector inicial x0: {error_message}"}), 400

    # Validación de la tolerancia
    tol = data.get('tol', 1e-6)  # Valor por defecto si no se proporciona
    valid, error_message = validate_tolerance(tol)
    if not valid:
        return jsonify({"error": f"Tolerancia: {error_message}"}), 400
    data['tol'] = tol  # Actualizar el valor validado

    # Validación del número máximo de iteraciones
    max_iter = data.get('max_iter', 1000)  # Valor por defecto si no se proporciona
    valid, error_message = validate_max_iterations(max_iter)
    if not valid:
        return jsonify({"error": f"Número máximo de iteraciones: {error_message}"}), 400
    data['max_iter'] = max_iter  # Actualizar el valor validado

    # Ejecución del método Gauss-Seidel
    result = gauss_seidel(data)
    return jsonify(result)
