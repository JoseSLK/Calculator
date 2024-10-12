import numpy as np
import sympy as sp

def newton_raphson(data):
    tol = data['tolerance']
    max_iter = 200
    regularization = 1e-8 

    n = len(data['initial_point'])
    x = sp.symbols(f'x0:{n}')

    f_exprs = [sp.sympify(func) for func in data['function']]

    f = sp.lambdify(x, f_exprs)
    J = sp.Matrix(f_exprs).jacobian(x)
    J_func = sp.lambdify(x, J)

    x0 = np.array(data['initial_point'], dtype=float)

    for i in range(max_iter):
        fx = np.array(f(*x0), dtype=float)
        Jx = np.array(J_func(*x0), dtype=float)

        Jx_reg = Jx + regularization * np.eye(n)

        try:
            dx = np.linalg.solve(Jx_reg, -fx)
        except np.linalg.LinAlgError:
            return {'status': 'error', 'error': f'Matriz singular en la iteración {i}'}

        x_new = x0 + dx

        if np.linalg.norm(np.array(f(*x_new), dtype=float)) < tol:
            return {'status': 'success', 'solution': x_new.tolist(), 'iterations': i + 1}

        x0 = x_new

    return {'status': 'error', 'error': 'Iteraciones agotadas: error!'}