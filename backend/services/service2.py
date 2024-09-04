
from flask import Blueprint, jsonify

bp = Blueprint('service2', __name__)

@bp.route('/service2', methods=['GET'])
def service1_home():
    return jsonify({"message": "Este es el servicio 2"})

@bp.route('/service2/solution', methods=['GET'])
def service2_solution():
    result = 0 #Reemplazar con el metodo
    return jsonify({"result": result})