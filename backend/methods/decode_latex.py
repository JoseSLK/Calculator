import base64

def decode_latex(encoded):
    decoded = base64.b64decode(encoded).decode('utf-8')
    return decoded
