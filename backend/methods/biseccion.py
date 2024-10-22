from math import *

def biseccion(data):

    f_str = data['function']
    a = data['min_limit']
    b = data['sup_limit']
    tol = data['tolerance']

    n = 500

    i = 1

    iteraciones = []

    def f(x):
        return eval(f_str)
    
    if f(a) * f(b) > 0:
        return {
            "resultado": "Error",
            "mensaje": "No hay cambio de signo en los límites, f(a)*f(b) > 0."
        }

    while i <= n:
        p = a + (b - a)/2
        #print("i = {0:<2}, p = {1:.12f}".format(i,p))
        iteraciones.append({
            "iteracion": i + 1,
            "x": p,
            "error" : (b - a)/2

        })
        if (b - a)/2 < tol:
            return {
                "resultado" : "siuuuu",
                "x" : p,
                "iteraciones" : iteraciones,
            }
        i += 1
        if f(a)*f(p) > 0:
            a = p
        else:
            b = p
    return {
        "resultado": "hola khe ace",
        "iteraciones": iteraciones,
        "mensaje": "Iteraciones agotadas sin convergencia"
    }
    