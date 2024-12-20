import matplotlib
matplotlib.use('Agg') 
import matplotlib.pyplot as plt
import numpy as np
import base64
from io import BytesIO
from math import *
from .decode_latex import decode_latex
from sympy.parsing.latex import parse_latex
from sympy import lambdify, symbols, srepr, E

def biseccion(data):

    try :
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
                "resultado": f"Error al interpretar la función: {e}",
                "iteracion": [],
                "grafica": None
            }

        a = float(data['min_limit'])
        b = float(data['sup_limit'])
        tol = data['tolerance']

        n = 500

        i = 1

        iteraciones = []

        f_a = float(f(a))
        f_b = float(f(b))

        print(f"Evaluación de f(a): {f_a}", flush=True)
        print(f"Evaluación de f(b): {f_b}", flush=True)
        
        if f_a * f_b > 0:
            return {
                "resultado": "Error: No hay cambio de signo en los límites, f(a)*f(b) > 0. El metodo diverge",
                "iteracion": None,
                "grafica": None
            }
        
        iter_x_vals = [a]      
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
            p = a + (b - a)/2
            iter_x_vals.append(p)
            iteraciones.append({
                "iteracion": i + 1,
                "x": p,
                "error" : (b - a)/2

            })
            if (b - a)/2 < tol:
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
                    "iteracion": iteraciones,
                    "grafica": img_base64
                }
            i += 1
            if f(a) * f(p) > 0:
                a = p
            else:
                b = p
        
        buf = BytesIO()
        plt.savefig(buf, format='png', dpi=300)
        buf.seek(0)
        img_base64 = base64.b64encode(buf.read()).decode('utf-8')
        buf.close()
        plt.clf()
        return {
            "resultado": "Iteraciones agotadas, no se encontró un punto fijo",
            "iteracion": iteraciones,
            "grafica": img_base64
        }
    
    except Exception as e:
            return {
                "resultado": f"Hubo un error, por favor asegurate de que los campos esten llenos y de que la funcion sea valida",
                "iteracion": [],
                "grafica": None
            }

    