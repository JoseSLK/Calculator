from flask import request, jsonify
from ..methods.broyden import broyden


def broyden_r():

    data = request.json
    
    
    result = broyden(data)
    return jsonify(result)