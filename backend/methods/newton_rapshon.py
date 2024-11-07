import matplotlib
matplotlib.use('Agg') 
import matplotlib.pyplot as plt
import numpy as np
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
    iteration = [] 
    

    f_prima = lambdify(xp, fp)
    p0=data['p0']
    tol=data['tolerance']
    n=500
    i = 1

    iter_x_vals = [p0]      
    x_vals = np.linspace(p0 - 1, p0 + 1, 400)  
    y_vals = [f_lambda(x) for x in x_vals]  

    plt.plot(x_vals, y_vals, label=f'f(x)', color='blue', linewidth=2)

    yprima_vals = [f_prima(x) for x in x_vals]

    plt.plot(x_vals, yprima_vals, label=f"f'(x)", color='purple', linewidth=2)


    plt.xlabel('x')
    plt.ylabel('y')
    plt.title(f'Grafica {f_str}')
    plt.legend()
    plt.grid(True)

    while i <= n:
        p = p0- f_lambda(p0)/f_prima(p0)
        iter_x_vals.append(p)
        iteration.append({
            "iteracion": i + 1,
            "x": float(p)
        })
        print("Iter = {0:<2}, p = {1:.12f}".format(i, p))

        if abs(p- p0) < tol:
            for x_value in iter_x_vals:
                plt.axvline(x=x_value, color='r', linestyle='--')
                print(f"x = {x_value}")

            buf = BytesIO()
            plt.savefig(buf, format='png', dpi=300)
            buf.seek(0)
            img_base64 = base64.b64encode(buf.read()).decode('utf-8')
            buf.close()

            return {
                "resultado": float(p),
                "iteraciones": iteration,
                "grafica": img_base64
            }
        p0 = p
        i += 1

    buf = BytesIO()
    plt.savefig(buf, format='png', dpi=300)
    buf.seek(0)
    img_base64 = base64.b64encode(buf.read()).decode('utf-8')
    buf.close() 
    return {
        "error": "Iteraciones agotadas, no se encontró un punto fijo",
        "grafica": img_base64
    }
# f, fprima, p0, tol, n
