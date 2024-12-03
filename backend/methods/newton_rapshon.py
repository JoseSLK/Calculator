import matplotlib
matplotlib.use('Agg') 
import matplotlib.pyplot as plt
import numpy as np
from math import *
from sympy import symbols, sympify, lambdify, srepr, E
from sympy.parsing.latex import parse_latex
from io import BytesIO
import base64
from .decode_latex import decode_latex

def newton(data):
    try:
        plt.clf()

        try:
            decode_fun = decode_latex(data['function'])
            x = symbols('x')
            sympy_expr = parse_latex(decode_fun)
            sympy_expr = sympy_expr.subs('e', E)
            f = lambdify(x, sympy_expr, modules=["numpy", "sympy"])

            decode_pri = decode_latex(data['fprima'])
            xp = symbols('x')
            sympy_expr2 = parse_latex(decode_pri)
            sympy_expr2 = sympy_expr2.subs('e', E)
            f_prima = lambdify(xp, sympy_expr2,  modules=["numpy", "sympy"])

        except Exception as e:
            return{
                "error": f"Error al interpretar la función, por favor digita una funcion valida",
                "iteracion": [],
                "grafica": None 
            }
        
        iteration = [] 
        
        p0=data['p0']
        tol=data['tolerance']
        n=500
        i = 1

        iter_x_vals = [p0]      
        x_min, x_max = -10, 10
        num_puntos = 1000

        x_vals = np.linspace(x_min, x_max, num_puntos)
        y_vals = [f(x) for x in x_vals]   

        plt.plot(x_vals, y_vals, label=f'f(x)', color='blue', linewidth=2)

        yprima_vals = [f_prima(x) for x in x_vals]

        plt.plot(x_vals, yprima_vals, label=f"f'(x)", color='purple', linewidth=2)


        plt.xlabel('x')
        plt.ylabel('y')
        plt.title(f'Grafica {sympy_expr}')
        plt.legend()
        plt.grid(True)

        while i <= n:
            p = p0- f(p0)/f_prima(p0)
            iter_x_vals.append(p)
            iteration.append({
                "iteracion": i + 1,
                "x": float(p),
                "error": ( p - p0 )
            })

            if abs(p- p0) < tol:
                for x_value in iter_x_vals:
                    plt.axvline(x=x_value, color='r', linestyle='--')

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
            "iteracion":iteration,
            "grafica": img_base64
        }
    except Exception as e:
            return {
                "error": f"Hubo un error, por favor asegurate de que los campos esten llenos y de que la funcion sea valida",
                "iteracion": [],
                "grafica": None
            }
