import numpy as np
import sympy as sp

def broyden(data):
    tol = data['tolerance']
    max_iter = 200
    regularization = 1e-8 

    n = len(data['initial_point'])  
    x = sp.symbols(f'x0:{n}')  

    f_exprs = [sp.sympify(func) for func in data['function']]
    f = sp.lambdify(x, f_exprs)

    x0 = np.array(data['initial_point'], dtype=float) 
    fx = np.array(f(*x0), dtype=float) 

    J = sp.Matrix(f_exprs).jacobian(x)
    J_func = sp.lambdify(x, J)  
    B = np.array(J_func(*x0), dtype=float)  

    iteration = []
    
    for i in range(max_iter):
        B_reg = B + regularization * np.eye(n)
        
        try:
            dx = np.linalg.solve(B_reg, -fx)
        except np.linalg.LinAlgError:
            return {"error": f"Matriz singular en la iteración {i}"}
        
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
                "iteraciones": iteration,
                "mensaje": f"Convergencia alcanzada en {i + 1} iteraciones"
            }
        
        delta_x = newx - x0
        delta_f = newfx - fx
        B += np.outer((delta_f - B @ delta_x), delta_x) / np.dot(delta_x, delta_x)
        
        x0 = newx
        fx = newfx
    
    return {
        "resultado": x0.tolist(),
        "iteraciones": iteration,
        "mensaje": "Iteraciones agotadas sin convergencia"
    }