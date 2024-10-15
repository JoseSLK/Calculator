from flask import request, jsonify
from ..methods.newton_rapshon import newton
from .validation import validate_function, validate_numeric, validate_tolerance, validate_limits

def newton_raphson_r():
    data = request.json

    # Validar la función
    valid, error_message = validate_function(data['function'])
    if not valid:
        return jsonify({"error": f"funcion: {error_message}"}), 400
    
    valid, error_message = validate_function(data['fprima'])
    if not valid:
        return jsonify({"error": f"f prima: {error_message}"}), 400

    # Validar punto inicial
    valid, error_message = validate_numeric(data['p0'])
    if not valid:
        return jsonify({"error": f"initial point: {error_message}"}), 400

    # Validar la tolerancia
    valid, error_message = validate_tolerance(data['tolerance'])
    if not valid:
        return jsonify({"error": error_message}), 400

    # Si todas las validaciones pasan, ejecuta el método de Newton
    result = newton(data)
    return jsonify(result)
