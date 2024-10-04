from math import *
#from sympy import sympify

def secante(data):
    f = data["function"]
   #f = sympify(f_str)
    p0 = data['initial_point_a']
    p1 = data['initial_point_b']
    tol = data['tolerance']

    n = 100

    i = 2
    while i <= n:
       p = p1- (f(p1)*(p1- p0))/(f(p1)- f(p0))
       print("Iter = {0:<2}, p = {1:.12f}".format(i, p))
       if abs(p- p1) < tol: 
            return p
       p0 = p1
       p1 = p
       i += 1
    print("Iteraciones agotadas: Error!")
    return None    
#f, p0, p1, tol, n