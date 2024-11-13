from math import *
import matplotlib
matplotlib.use('Agg') 
import matplotlib.pyplot as plt
import numpy as np
from sympy import symbols, sympify, lambdify
from io import BytesIO
import base64

def secante(data):

    plt.clf()

    f_str = data["function"]
    x = symbols('x')
    f = sympify(f_str)
    f_lambda = lambdify(x, f)
    p0 = data['initial_point_a']
    p1 = data['initial_point_b']
    tol = data['tolerance']
    iteration = []  
    n = 100
    i = 2

    x_min, x_max = -10, 10
    num_puntos = 1000

    x_vals = np.linspace(x_min, x_max, num_puntos)
    y_vals = [f(x) for x in x_vals]   

    plt.plot(x_vals, y_vals, label=f'f(x)', color='blue', linewidth=2)
    plt.xlabel('x')
    plt.ylabel('y')
    plt.title(f'Grafica {f_str}')
    plt.legend()
    plt.grid(True)

    while i <= n:
       p = p1- (f_lambda(p1)*(p1- p0))/(f_lambda(p1)- f_lambda(p0))
       print("Iter = {0:<2}, p = {1:.12f}".format(i, p))

       iteration.append({
            "iteracion": i + 1,
            "x": float(p)
        })
       

       plt.plot([p0, p1], [f_lambda(p0), f_lambda(p1)], color='red', linestyle='--', linewidth=1)
       
       if abs(p- p1) < tol: 
            buf = BytesIO()
            plt.savefig(buf, format='png', dpi=300)
            buf.seek(0)
            img_base64 = base64.b64encode(buf.read()).decode('utf-8')
            buf.close() 
            plt.clf()
            return {
                "resultado": float(p),
                "iteracion": iteration,
                "grafica": img_base64
            }
       
       p0 = p1
       p1 = p
       i += 1
    buf = BytesIO()
    plt.savefig(buf, format='png', dpi=300)
    buf.seek(0)
    img_base64 = base64.b64encode(buf.read()).decode('utf-8')
    buf.close() 
    plt.clf() 
    return {
        "error": "Iteraciones agotadas, no se encontró un punto fijo",
        "grafica": img_base64
    }  
#f, p0, p1, tol, n