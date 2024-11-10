from flask import request, jsonify
from ..methods.punto_fijo import puntofijo
from .validation import validate_function, validate_numeric, validate_tolerance, validate_limits

def puntofijo_r():
    
    data = request.json

    valid, error_message = validate_function(data['function'])
    if not valid:
        return jsonify({"error": f'{error_message}+function'}), 400
    
    valid, error_message = validate_numeric(data['initial_point'])
    if not valid:
        return jsonify({"error": f'{error_message}+point'})
    
    valid, error_message = validate_tolerance(data['tolerance'])
    if not valid:
        return jsonify({"error": f'{error_message}+tole'}), 400

    result = puntofijo(data)
    return jsonify(result)