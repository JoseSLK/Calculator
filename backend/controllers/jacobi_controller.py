from flask import request, jsonify
from ..methods.jacobi import jacobi  
from .validation import validate_matrix, validate_vector, validate_tolerance, validate_max_iterations

def jacobi_r():
    data = request.json

    # Validación de la matriz de coeficientes A (despejada)
    # valid, error_message = validate_matrix(data.get('A'))
    # if not valid:
    #     return jsonify({"error": f"Matriz A (despejada): {error_message}"}), 400

    # # Validación del vector inicial x0
    # valid, error_message = validate_vector(data.get('x0'))
    # if not valid:
    #     return jsonify({"error": f"Vector inicial x0: {error_message}"}), 400

    # # Validación de la tolerancia
    # tol = data.get('tol', 1e-6)  # Valor por defecto si no se proporciona
    # valid, error_message = validate_tolerance(tol)
    # if not valid:
    #     return jsonify({"error": f"Tolerancia: {error_message}"}), 400
    # data['tol'] = tol  # Actualizar el valor validado

    result = jacobi(data)
    return jsonify(result)


