from flask import request, jsonify
from ..methods.Gauss_Seidel import gauss_seidel

def gauss_seidel_r():
    """
    Recibe una solicitud JSON con los datos necesarios, valida la entrada básica y ejecuta el método de Gauss-Seidel.
    """
    data = request.json

    # Validaciones mínimas para asegurar que los datos básicos existen
    if 'function' not in data or not isinstance(data['function'], list):
        return jsonify({"error": "La matriz de coeficientes (function) es obligatoria y debe ser una lista"}), 400

    if 'x0' not in data or not isinstance(data['x0'], list):
        return jsonify({"error": "El vector inicial (x0) es obligatorio y debe ser una lista"}), 400

    # Tolerancia opcional con valor por defecto
    if 'tol' in data:
        try:
            data['tol'] = float(data['tol'])
        except ValueError:
            return jsonify({"error": "La tolerancia (tol) debe ser un número válido"}), 400
    else:
        data['tol'] = 1e-6  # Valor por defecto

    # Número máximo de iteraciones opcional
    if 'max_iter' in data:
        try:
            data['max_iter'] = int(data['max_iter'])
        except ValueError:
            return jsonify({"error": "El número máximo de iteraciones (max_iter) debe ser un entero válido"}), 400
    else:
        data['max_iter'] = 300  # Valor por defecto

    # Ejecutar el método Gauss-Seidel
    try:
        result = gauss_seidel(data)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": f"Error al ejecutar el método de Gauss-Seidel: {str(e)}"}), 500
