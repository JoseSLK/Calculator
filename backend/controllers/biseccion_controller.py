from flask import request, jsonify
from ..methods.biseccion import biseccion

def biseccion_r():
    data = request.json

    result = biseccion(data)
    return jsonify(result)
