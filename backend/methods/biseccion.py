import matplotlib
matplotlib.use('Agg') 
import matplotlib.pyplot as plt
import numpy as np
import base64
from io import BytesIO
from math import *

def biseccion(data):

    f_str = data['function']
    a = data['min_limit']
    b = data['sup_limit']
    tol = data['tolerance']

    n = 500

    i = 1

    iteraciones = []


    def f(x):
        return eval(f_str)
    
    if f(a) * f(b) > 0:
        return {
            "resultado": "Error",
            "mensaje": "No hay cambio de signo en los límites, f(a)*f(b) > 0."
        }
    
    iter_x_vals = [a]      
    x_vals = np.linspace(a - 1, a + 1, 400)  
    y_vals = [f(x) for x in x_vals]  

    plt.plot(x_vals, y_vals, label=f'f(x)', color='blue', linewidth=2)

    plt.xlabel('x')
    plt.ylabel('y')
    plt.title(f'Grafica {f_str}')
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
            
            return {
                "resultado": float(p),
                "iteraciones": iteraciones,
                "grafica": img_base64
            }
        i += 1
        if f(a)*f(p) > 0:
            a = p
        else:
            b = p
    
    buf = BytesIO()
    plt.savefig(buf, format='png', dpi=300)
    buf.seek(0)
    img_base64 = base64.b64encode(buf.read()).decode('utf-8')
    buf.close()

    plt.savefig('grafica_biseccion.png', dpi=300)   
    return {
        "error": "Iteraciones agotadas, no se encontró un punto fijo",
        "grafica": img_base64
    }

    