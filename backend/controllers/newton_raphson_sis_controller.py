from flask import request, jsonify
from ..methods.newton_raphson_sistemas import newton_raphson
from .validation import validate_numeric, validate_tolerance, validate_limits

def newton_raphson_r():
    data = request.json

    # for i in range(len(data['function'])):
    #     valid, error_message = validate_function(data['function'][i])
    #     if not valid:
    #         return jsonify({"error": f"error en la funcion {i+1}: {error_message}" }), 400
        
    for j in range(len(data['initial_point'])):
        valid, error_message = validate_numeric(data['initial_point'][j])
        if not valid:
            return jsonify({"error": f"error en punto inicial {j+1}: {error_message}"}), 400
        
    valid, error_message = validate_tolerance(data['tolerance'])
    if not valid:
        return jsonify({"error": error_message}), 400
        
    result = newton_raphson(data)
    return jsonify(result)
