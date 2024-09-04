from flask import Flask, jsonify

def create_app():
    app = Flask(__name__)

    # Importar y registrar los blueprints (rutas)
    from .service1 import bp as service1_bp
    from .service2 import bp as service2_bp
    
    app.register_blueprint(service1_bp)
    app.register_blueprint(service2_bp)

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5000)