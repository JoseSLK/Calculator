from math import *

def biseccion(data):

    f_str = data['function']
    a = data['min_limit']
    b = data['sup_limit']
    tol = data['tolerance']


    n = 500

    i = 1

    def f(x):
        return eval(f_str)

    while i <= n:
        p = a + (b - a)/2
        print("i = {0:<2}, p = {1:.12f}".format(i,p))
        if abs(f(p)) <= 1e-15 or (b - a)/2 < tol:
            return p
        i += 1
        if f(a)*f(p) > 0:
            a = p
        else:
            b = p
    print("Iteraciones agotadas: Error!")
    return None
    
# biseccion(pol, 1, 2, 1e-8)