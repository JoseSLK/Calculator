from math import *
from sympy import symbols, sympify, lambdify
def newton(data):
    f_str=data['function']
    x = symbols('x')
    f = sympify(f_str)

    f_lambda = lambdify(x, f)
    fprima=data['fprima']
    xp = symbols('x')
    fp = sympify(fprima)

    f_prima = lambdify(xp, fp)
    p0=data['p0']
    tol=data['tolerance']
    n=500
    i = 1

    while i <= n:
        p = p0- f_lambda(p0)/f_prima(p0)
        print("Iter = {0:<2}, p = {1:.12f}".format(i, p))
        if abs(p- p0) < tol:
            return p
        p0 = p
        i += 1
    print("Iteraciones agotadas: Error!")
    return None
# f, fprima, p0, tol, n
