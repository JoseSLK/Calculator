from .controllers import biseccion_controller
from .controllers import punto_fijo_controller
from .controllers import secante_controller
from .controllers import newton_rapshon_controller

def init_routes(app):
    app.add_url_rule('/biseccion', 'biseccion', biseccion_controller.biseccion_r, methods=['POST'])
    app.add_url_rule('/puntofijo', 'puntofijo', punto_fijo_controller.puntofijo_r, methods=['POST'])
    app.add_url_rule('/secante', 'secante', secante_controller.secante_r, methods=['POST'])
    app.add_url_rule('/newton', 'newton', newton_rapshon_controller.newton_raphson_r, methods=['POST'])

