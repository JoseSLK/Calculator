from flask import request, jsonify
from ..methods.secante import secante
from .validation import validate_function, validate_numeric, validate_tolerance, validate_limits

def secante_r():
    data = request.json

    valid, error_message = validate_function(data['function'])
    if not valid:
        return jsonify({"error": error_message}), 400
    
    valid, error_message = validate_numeric(data['initial_point_a'])
    if not valid:
        return jsonify({"error": f"initial point a: {error_message}"}), 400
    
    valid, error_message = validate_numeric(data['initial_point_b'])
    if not valid:
        return jsonify({"error": f"initial point b: {error_message}"}), 400
    
    valid, error_message = validate_tolerance(data['tolerance'])
    if not valid:
        return jsonify({"error": error_message}), 400
    

 
    result = secante(data)
    return jsonify(result)

    
