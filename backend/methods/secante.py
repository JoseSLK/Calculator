from math import *
import matplotlib
matplotlib.use('Agg') 
import matplotlib.pyplot as plt
import numpy as np
from sympy import symbols, sympify, lambdify, srepr, E
from sympy.parsing.latex import parse_latex
from io import BytesIO
import base64
from .decode_latex import decode_latex

def secante(data):
    try:
        plt.clf()

        try:
            decode_fun = decode_latex(data['function'])
            latex_expr = decode_fun

            x = symbols('x')
            sympy_expr = parse_latex(latex_expr)
            sympy_expr = sympy_expr.subs('e', E)

            f = lambdify(x, sympy_expr, modules=["numpy", "sympy"])
        except Exception as e:
            return {
                "resultado": f"Error al interpretar la función, por favor digita una funcion valida",
                "iteracion": [],
                "grafica": None
            }

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
        plt.title(f'Grafica {sympy_expr}')
        plt.legend()
        plt.grid(True)

        while i <= n:

            if abs(f(p1) - f(p0)) < 1e-20:
                buf = BytesIO()
                plt.savefig(buf, format='png', dpi=300)
                buf.seek(0)
                img_base64 = base64.b64encode(buf.read()).decode('utf-8')
                buf.close()
                return {
                    "resultado": "División por cero detectada durante el cálculo.",
                    "iteracion": iteration,
                    "grafica": img_base64
                }
        
            p = p1- (f(p1)*(p1- p0))/(f(p1)- f(p0))

            iteration.append({
                "iteracion": i,
                "x": float(p),
                "error" : (p - p1)
            })
        
            x_range = np.linspace(p0 - 2, p1 + 2, 100)
            y_range = f(p0) + ((f(p1) - f(p0)) / (p1 - p0)) * (x_range - p0)
            plt.plot(x_range, y_range, color='red', linestyle='--', linewidth=3)  
        
            if abs(p - p1) < tol: 
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
            "resultado": "Iteraciones agotadas, no se encontró un punto fijo",
            "iteracion": iteration,
            "grafica": img_base64
        }
    except Exception as e:
            return {
                "resultado": f"Hubo un error, por favor asegurate de que los campos esten llenos y de que la funcion sea valida",
                "iteracion": [],
                "grafica": None
            }