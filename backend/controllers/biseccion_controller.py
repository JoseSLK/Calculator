from flask import request, jsonify
from ..methods.biseccion import biseccion
from .validation import validate_numeric, validate_tolerance, validate_limits
import base64

def biseccion_r():
    
    data = request.json

    # valid, error_message = validate_function(data['function'])
    # if not valid:
    #     return jsonify({"error": error_message}), 400
    
    valid, error_message = validate_limits(data['min_limit'], data['sup_limit'])
    if not valid:
        return jsonify({"error": error_message}), 400
    
    valid, error_message = validate_tolerance(data['tolerance'])
    if not valid:
        return jsonify({"error": error_message}), 400
    
    result = biseccion(data)
    return jsonify(result)
