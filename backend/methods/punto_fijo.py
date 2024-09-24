from math import *

def puntofijo(data):
    n = 100
    i = 1

    f_str = data['function']
    p0 = data['initial_point']
    tol = data['tolerance']

    try:
        def f(x):
            return eval(f_str)
    except Exception as e:
        print(f"Error al evaluar la función: {e}")
        return 0
    try:
        p0 = float(p0)
    except ValueError:
        print(f"Error: El valor inicial '{p0}' no es un número válido.")
        return 0
    
    try:
        tol = float(tol)
    except ValueError:
        print(f"Error: La tolerancia '{tol}' no es un número válido.")
        return 0

    while i <= n:
        p = f(p0)

        print("Iter = {0:<2}, p = {1:.12f}".format(i, p))
        if abs( ( (p-p0)/p ) ) < tol:
            return p
        
        p0 = p

        i += 1
    print("Iteraciones agotadas: error!")
    return 0

