from flask import request, jsonify
from ..methods.newton_rapshon import  newton
from .validation import validate_function, validate_numeric, validate_tolerance, validate_limits


def newton_raphson_r():
    data = request.json

    result = newton(data)
    return jsonify(result)