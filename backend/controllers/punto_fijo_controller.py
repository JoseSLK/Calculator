from flask import request, jsonify
from ..methods.punto_fijo import puntofijo

def puntofijo_r():
    data  = request.json

    result = puntofijo(data)
    return jsonify(result)