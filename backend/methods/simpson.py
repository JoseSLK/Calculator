import numpy as np


def simpson(data):
    """
    Calcula la integral definida de una función `fx` usando la Regla de Simpson 1/3 con tramos equidistantes.

    Parámetros:
    data (dict): Un diccionario que contiene la función 'function', los límites 'a' y 'b', y el número de 'tramos'.
                 El número de tramos debe ser par.

    Retorna:
    dict: Un resultado que contiene el área calculada, los detalles de cada iteración y un mensaje.
    """
    fx = data['function']  # Función para evaluar
    a = data['a']  # Límite inferior de integración
    b = data['b']  # Límite superior de integración
    tramos = data['tramos']  # Número de tramos

    # Validar que el número de tramos sea par
    if tramos % 2 != 0:
        return {
            "mensaje": "El número de tramos debe ser par para aplicar la Regla de Simpson 1/3"
        }

    h = (b - a) / tramos
    xi = a
    suma = fx(xi)
    iteration = []

    for i in range(1, tramos):
        xi += h
        coeficiente = 4 if i % 2 != 0 else 2  # Alterna entre 4 y 2
        suma += coeficiente * fx(xi)
        iteration.append({
            "iteracion": i,
            "x": xi,
            "f(xi)": fx(xi),
            "coeficiente": coeficiente
        })

    suma += fx(b)
    area = h * (suma / 3)

    return {
        "resultado": area,
        "iteracion": iteration,
        "mensaje": "Cálculo de la integral completado con éxito usando la Regla de Simpson 1/3"
    }
