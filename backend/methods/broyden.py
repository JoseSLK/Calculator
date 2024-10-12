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
    
    for i in range(max_iter):
        B_reg = B + regularization * np.eye(n)
        
        try:
            dx = np.linalg.solve(B_reg, -fx)
        except np.linalg.LinAlgError:
            print(f"Matriz singular en la iteración {i}")
            return None
        
        newx = x0 + dx 
        newfx = np.array(f(*newx), dtype=float) 
        
        if np.linalg.norm(newfx) < tol:
            print(f"Iteraciones = {i + 1}")
            return newx.tolist() 
        
        delta_x = newx - x0
        delta_f = newfx - fx
        B += np.outer((delta_f - B @ delta_x), delta_x) / np.dot(delta_x, delta_x)
        
        x0 = newx
        fx = newfx
    
    print(f'Iteraciones agotadas: error!')
    return x0.tolist()