import numpy as np

def trapecio(data):
    """
    Calcula la integral definida de una función `fx` usando la Regla de los Trapecios con tramos equidistantes.
    
    Parámetros:
    data (dict): Un diccionario que contiene la función 'function', los límites 'a' y 'b', y el número de 'tramos'.
    
    Retorna:
    dict: Un resultado que contiene el área calculada y los detalles de cada iteración.
    """
    fx = data['function']  # Función para evaluar
    a = data['a']  # Límite inferior de integración
    b = data['b']  # Límite superior de integración
    tramos = data['tramos']  # Número de tramos

    h = (b - a) / tramos
    xi = a
    suma = fx(xi)
    iteration = []

    for i in range(1, tramos):
        xi += h
        suma += 2 * fx(xi)
        iteration.append({
            "iteracion": i,
            "x": xi,
            "f(xi)": fx(xi)
        })

    suma += fx(b)
    area = h * (suma / 2)

    return {
        "resultado": area,
        "iteracion": iteration,
        "mensaje": "Cálculo de la integral completado con éxito"
    }


