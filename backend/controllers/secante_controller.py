from flask import request, jsonify
from ..methods.secante import secante
from .validation import validate_function, validate_numeric, validate_tolerance, validate_limits

def secante_r():
    data = request.json
 
    result = secante(data)
    return jsonify(result)
