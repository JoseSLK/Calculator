from flask import Blueprint, jsonify

bp = Blueprint('service1', __name__)

@bp.route('/service1', methods=['GET'])
def service1_home():
    return jsonify({"message": "Este es el servicio 1"})

@bp.route('/service1/solution', methods=['GET'])
def service1_solution():
    result = 0 #Reemplazar con el metodo
    return jsonify({"result": result})