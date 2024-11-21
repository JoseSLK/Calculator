from flask import request, jsonify
from ..methods.simpson import simpson
from .validation import validate_numeric, validate_limits

def simpson_r():
    data = request.json

    # Validación de los límites de integración
    valid, error_message = validate_limits(data['a'], data['b'])
    if not valid:
        return jsonify({"error": error_message}), 400

    # Validación del número de tramos (debe ser par)
    if data['tramos'] % 2 != 0:
        return jsonify({"error": "El número de tramos debe ser par para aplicar la Regla de Simpson 1/3"}), 400

    result = simpson(data)
    return jsonify(result)
