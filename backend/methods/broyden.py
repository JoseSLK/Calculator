import numpy as np
import sympy as sp
from sympy import symbols, sympify, lambdify, srepr, E
from sympy.parsing.latex import parse_latex
from .decode_latex import decode_latex

def broyden(data):

    try:
        try:
            decode_functions = []

            for idx, encode_eq in enumerate(data['function']):
                decode_eq = decode_latex(encode_eq)
                sympy_expr = parse_latex(decode_eq)
                sympy_expr = sympy_expr.subs('e', E)
                decode_functions.append(sympy_expr)

        except Exception as e:
            return {
                "resultado": "Error al decodificar las ecuaciones. Verifique que estén en formato válido.",
                "iteracion": None,
                "mensaje": str(e)
            }

        n = len(data['initial_point'])
        x_symbols = sp.symbols(' '.join([chr(97 + i) for i in range(n)]))

        tol = data['tolerance']
        max_iter = 200
        regularization = 1e-8 

        try:
            f = sp.lambdify(x_symbols, decode_functions, modules=["numpy", "sympy"])
        except Exception as e:
            return {
                "resultado": "Error al procesar las funciones. Verifique las ecuaciones decodificadas.",
                "iteracion": None,
                "mensaje": str(e)
            }

        x0 = np.array(data['initial_point'], dtype=float) 
        fx = np.array(f(*x0), dtype=float) 

        J = sp.Matrix(decode_functions).jacobian(x_symbols)
        J_func = sp.lambdify(x_symbols, J, modules=["numpy", "sympy"])  
        B = np.array(J_func(*x0), dtype=float)  

        iteration = []
        
        for i in range(max_iter):
            B_reg = B + regularization * np.eye(n)
            
            try:
                dx = np.linalg.solve(B_reg, -fx)
            except np.linalg.LinAlgError:
                return {
                    "resultado": f"Matriz singular en la iteración {i}",
                    "iteracion": iteration,
                    "mensaje": ""
                }
            
            newx = x0 + dx 
            newfx = np.array(f(*newx), dtype=float)
            
            # Guarda los resultados de cada iteración en formato JSON
            iteration.append({
                "iteracion": i + 1,
                "x": newx.tolist(),
                "f(x)": newfx.tolist(),
                "error": np.linalg.norm(newfx)
            })
            
            if np.linalg.norm(newfx) < tol:
                return {
                    "resultado": newx.tolist(),
                    "iteracion": iteration,
                    "mensaje": f"Convergencia alcanzada en {i + 1} iteraciones"
                }
            
            delta_x = newx - x0
            delta_f = newfx - fx
            B += np.outer((delta_f - B @ delta_x), delta_x) / np.dot(delta_x, delta_x)
            
            x0 = newx
            fx = newfx
        
        return {
            "resultado": x0.tolist(),
            "iteracion": iteration,
            "mensaje": "Iteraciones agotadas sin convergencia"
        }
    except Exception as e:
            return {
                "error": f"Hubo un error, por favor asegurate de que los campos esten llenos y de que la funcion sea valida",
                "iteracion": [],
                "grafica": None
            }