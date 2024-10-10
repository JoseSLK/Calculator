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

    while i <= n:
        p = f(p0)

        print("Iter = {0:<2}, p = {1:.12f}".format(i, p))
        if abs( ( (p-p0)/p ) ) < tol:
            return p
        
        p0 = p

        i += 1
    print("Iteraciones agotadas: error!")
    return 0

