from flask import Flask, jsonify, send_from_directory
from .routes import init_routes
import os

app = Flask(__name__, static_folder='../frontend')

init_routes(app)

@app.route('/')
def serve_frontend():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory(app.static_folder, path)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')