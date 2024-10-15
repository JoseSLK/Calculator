from math import *

def puntofijo(data):
    n = 100
    i = 1

    f_str = data['function']
    p0 = data['initial_point']
    tol = data['tolerance']

    iteration = []

    def f(x):
        return eval(f_str)

    while i <= n:
        p = f(p0)
        print("Iter = {0:<2}, p = {1}".format(i, p))
        iteration.append({
            "iteracion": i + 1,
            "x": float(p)
        })
        

        if abs((p - p0) / p) < tol:
            return {
                    "resultado": float(p),
                    "iteraciones": iteration
                }

        p0 = p
        i += 1

    return {"error": "Iteraciones agotadas, no se encontró un punto fijo"}

