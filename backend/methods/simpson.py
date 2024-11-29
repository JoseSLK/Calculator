import math
import matplotlib
matplotlib.use('Agg') 
import matplotlib.pyplot as plt
import numpy as np
import base64
from io import BytesIO
from .decode_latex import decode_latex
from sympy.parsing.latex import parse_latex
from sympy import symbols, sympify, lambdify, srepr, E


def simpson(data):
    """
    Calcula la integral definida de una función `fx` usando la Regla de Simpson 1/3 con tramos equidistantes.

    Parámetros:
    data (dict): Un diccionario que contiene la función 'function', los límites 'a' y 'b', y el número de 'tramos'.
                 El número de tramos debe ser par.

    Retorna:
    dict: Un resultado que contiene el área calculada, los detalles de cada iteración y un mensaje.
    """
    plt.clf()

    try:
        decode_fun = decode_latex(data['function'])

        latex_expr = decode_fun
        x = symbols('x')
        sympy_expr = parse_latex(latex_expr)
        sympy_expr = sympy_expr.subs('e', E)
        fx = lambdify(x, sympy_expr, modules=["numpy", "sympy"])  # Función para evaluar
    except Exception as e:
        return {
            "resultado": f"Error al interpretar la función, por favor digita una funcion valida",
            "iteracion": [],
            "grafica": None
        }
    
    a = data['a']  # Límite inferior de integración
    b = data['b']  # Límite superior de integración
    tramos = data['tramos']  # Número de tramos

    # Validar que el número de tramos sea par
    if tramos % 2 != 0:
        return {
            "resultado": "No se pudo llevar a cabo la solucion",
            "iteracion": None,
            "mensaje": "El número de tramos debe ser par para aplicar la Regla de Simpson 1/3",
            "grafica": None
        }

    h = (b - a) / tramos
    xi = a
    suma = fx(xi)
    iteration = []

    x_min, x_max = -10, 10
    num_puntos = 1000

    x_vals = np.linspace(x_min, x_max, num_puntos)
    y_vals = [fx(x) for x in x_vals] 

    plt.plot(x_vals, y_vals, label='f(x)', color='blue', linewidth=2)

    x1_vals = [a + i * h for i in range(tramos + 1)]
    y1_vals = [fx(x) for x in x1_vals]

    plt.xlabel('x')
    plt.ylabel('f(x)')
    plt.title(f'Grafica {fx}')
    plt.legend()
    plt.grid(True)

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

        if i % 2 == 1: 
            x_fill = [x1_vals[i - 1], x1_vals[i], x1_vals[i + 1]]
            y_fill = [fx(x) for x in x_fill]
            x_interp = np.linspace(x1_vals[i - 1], x1_vals[i + 1], 100)
            y_interp = np.interp(x_interp, x_fill, y_fill)
            plt.fill_between(x_interp, y_interp, color='orange', alpha=0.3)

    suma += fx(b)
    area = h * (suma / 3)

    plt.scatter(x1_vals, y1_vals, color='red')

    buf = BytesIO()
    plt.savefig(buf, format='png', dpi=300)
    buf.seek(0)
    img_base64 = base64.b64encode(buf.read()).decode('utf-8')
    buf.close() 
    plt.clf() 
    

    return {
        "resultado": area,
        "iteracion": iteration,
        "mensaje": "Cálculo de la integral completado con éxito usando la Regla de Simpson 1/3",
        "grafica": img_base64
    }