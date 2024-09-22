from .controllers import biseccion_controller

def init_routes(app):
    app.add_url_rule('/biseccion', 'biseccion', biseccion_controller.biseccion_r, methods=['POST'])
