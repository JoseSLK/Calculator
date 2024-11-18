from flask import request, jsonify
from ..methods.trapecio import trapecio
from .validation import validate_numeric, validate_limits

def trapecio_r():
    data = request.json

    # Validación de los límites de integración
    valid, error_message = validate_limits(data['a'],data['b'])
    if not valid:
        return jsonify({"error": error_message}), 400
    
    result = trapecio(data)
    return jsonify(result)
    
   