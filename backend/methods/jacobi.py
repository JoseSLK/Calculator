import numpy as np

def jacobi(data):
    """
    Método de Jacobi para resolver sistemas de ecuaciones lineales en forma despejada.
    
    Parámetros:
    data (dict): Un diccionario que contiene la matriz de coeficientes 'A' (en forma despejada), 
                 el vector inicial 'x0', la tolerancia 'tol' y el número máximo de iteraciones 'max_iter'.
    
    Retorna:
    dict: Resultado que contiene la solución encontrada, las iteraciones realizadas y detalles de cada iteración.
    """
    A = np.array(data['function'], dtype=float)  # Matriz de coeficientes
    x0 = np.array(data['x0'], dtype=float)  # Vector inicial
    tol = data.get('tolerance', 1e-6)  # Tolerancia para el criterio de parada
    max_iter = data.get('max_iter', 1000)  # Número máximo de iteraciones

    n = len(A)
    x = x0.copy()
    x_new = np.zeros_like(x)
    iteration = []

    for num_iter in range(max_iter):
        for i in range(n):
            # Calcular la nueva aproximación usando la forma despejada
            suma = sum(A[i][j] * x[j] for j in range(n) if j != i)
            x_new[i] = (A[i][-1] - suma)  # Se asume que el término independiente está al final de cada fila

        # Guardar detalles de la iteración
        iteration.append({
            "iteracion": num_iter + 1,
            "x": x_new.tolist(),
            "error": np.linalg.norm(x_new - x)
        })

        # Verificar el criterio de parada
        if np.linalg.norm(x_new - x) < tol:
            return {
                "resultado": x_new.tolist(),
                "iteracion": iteration,
                "mensaje": f"Convergencia alcanzada en {num_iter + 1} iteraciones"
            }

        # Actualizar el valor de x
        x = x_new.copy()

    return {
        "resultado": x.tolist(),
        "iteracion": iteration,
        "mensaje": "Iteraciones agotadas sin convergencia"
    }
# if __name__ == "__main__":
#     data = {
#         'function': [
#             [0, 0.25, 0.25, 10], 
#             [0.2, 0, 0.2, 5],  
#             [0.1, 0.1, 0, 8]   
#         ],
#         'x0': [0, 0, 0],  # Vector inicial
#         'tol': 1e-6,
#         'max_iter': 200
#     }
#     result = jacobi(data)
#     print(result)


