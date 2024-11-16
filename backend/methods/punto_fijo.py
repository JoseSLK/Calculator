from math import *
import numpy as np
import matplotlib.pyplot as plt
from io import BytesIO
import base64
from sympy.parsing.latex import parse_latex
from sympy import lambdify, symbols, srepr, E
from .decode_latex import decode_latex

def puntofijo(data):

    plt.clf()

    n = 100  
    i = 1    

    decode_fun = decode_latex(data['function'])
    print(f"La deco: {decode_fun}")
    latex_expr = decode_fun
    
    sympy_expr = parse_latex(latex_expr)
    sympy_expr = sympy_expr.subs('e', E)
    
    print(f"parse: {sympy_expr}")
    x = symbols('x')
    f = lambdify(x, sympy_expr, modules=["numpy", "sympy"]) 

    p0 = data['initial_point'] 
    tol = data['tolerance']    

    iteration = []

    x_min, x_max = -10, 10
    num_puntos = 1000

    x_vals = np.linspace(x_min, x_max, num_puntos)
    y_vals = []
    for x_val in x_vals:
        try:
            y_val = f(x_val)
            if np.isreal(y_val):
                y_vals.append(y_val)
            else:
                y_vals.append(np.nan)
        except Exception:
            y_vals.append(np.nan)

    iter_x_vals = [p0]        

    plt.plot(x_vals, y_vals, label=f'f(x)', color='blue', linewidth=2)
    plt.xlabel('x')
    plt.ylabel('y')
    plt.title(f'Grafica {latex_expr}')
    plt.legend()
    plt.grid(True)

    previous_error = float('inf')

    while i <= n:
        try:
            p = f(p0)
            error = abs((p - p0) / p) * 100 if p != 0 else 0
        except ValueError:
            
            buf = BytesIO()
            plt.savefig(buf, format='png', dpi=300)
            buf.seek(0)
            img_base64 = base64.b64encode(buf.read()).decode('utf-8')
            buf.close()
            plt.clf()
            return {
                "resultado": "Error en la evaluación de la función (posible dominio no válido)",
                "iteracion": iteration,
                "grafica": img_base64
            }

        iter_x_vals.append(p)
        iteration.append({
            "iteracion": i + 1,
            "x": float(p),
            "error": float(error)
        })
        
        for x_value in iter_x_vals:
            plt.axvline(x=x_value, color='r', linestyle='--')

        if abs((p - p0) / p) < tol:

            buf = BytesIO()
            plt.savefig(buf, format='png', dpi=300)
            buf.seek(0)
            img_base64 = base64.b64encode(buf.read()).decode('utf-8')
            buf.close() 
            plt.clf()
            print(f'this is p={p}')

            return {
                "resultado": float(p),
                "iteracion": iteration,
                "grafica": img_base64
            }

        

        if error > previous_error:
            buf = BytesIO()
            plt.savefig(buf, format='png', dpi=300)
            buf.seek(0)
            img_base64 = base64.b64encode(buf.read()).decode('utf-8')
            buf.close()
            plt.clf()
            return {
                "resultado": "El método parece estar divergiendo",
                "iteracion": iteration,
                "grafica": img_base64
            }
        
        p0 = p
        i += 1

    buf = BytesIO()
    plt.savefig(buf, format='png', dpi=300)
    buf.seek(0)
    img_base64 = base64.b64encode(buf.read()).decode('utf-8')
    buf.close()  
    plt.clf()
    return {
        "resultado": "Iteraciones agotadas, no se encontró un punto fijo",
        "iteracion": None,
        "grafica": img_base64
    }