from flask import request, jsonify
from ..methods.punto_fijo import puntofijo

def puntofijo_r():
    
    data = request.json

    valid, error_message = validate_function(data['function'])
    if not valid:
        return jsonify({"error": error_message}), 400
    
    valid, error_message = validate_limits(data['min_limit'], data['sup_limit'])
    if not valid:
        return jsonify({"error": error_message}), 400
    
    valid, error_message = validate_tolerance(data['tolerance'])
    if not valid:
        return jsonify({"error": error_message}), 400

    result = puntofijo(data)
    return jsonify(result)