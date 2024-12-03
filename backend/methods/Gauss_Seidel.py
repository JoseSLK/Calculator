import numpy as np


def gauss_seidel(data):
    """
    Parámetros:
    data (dict): Un diccionario que contiene la matriz de coeficientes 'A' (en forma despejada),
                 el vector inicial 'x0', la tolerancia 'tol' y el número máximo de iteraciones 'max_iter'.
    Retorna:
    dict: Resultado que contiene la solución encontrada, las iteraciones realizadas y detalles de cada iteración.
    """
    try:
        A = np.array(data['function'], dtype=float)  # Matriz de coeficientes
        x0 = np.array(data['x0'], dtype=float)  # Vector inicial
        tol = data.get('tol', 1e-6)  # Tolerancia para el criterio de parada
        max_iter = data.get('max_iter', 1000)  # Número máximo de iteraciones

        n = len(A)
        x = x0.copy()
        iteration = []

        for num_iter in range(max_iter):
            x_old = x.copy()
            for i in range(n):
                # Calcular la nueva aproximación usando la forma despejada
                suma = sum(A[i][j] * x[j] for j in range(n) if j != i)
                x[i] = (A[i][-1] - suma)  # Se asume que el término independiente está al final de cada fila

            # Guardar detalles de la iteración
            iteration.append({
                "iteracion": num_iter + 1,
                "x": x.tolist(),
                "error": np.linalg.norm(x - x_old)
            })

            # Verificar el criterio de parada
            if np.linalg.norm(x - x_old) < tol:
                return {
                    "resultado": x.tolist(),
                    "iteracion": iteration,
                    "mensaje": f"Convergencia alcanzada en {num_iter + 1} iteraciones"
                }

        return {
            "resultado": x.tolist(),
            "iteracion": iteration,
            "mensaje": "Iteraciones agotadas sin convergencia"
        }
    except Exception as e:
            return {
                "resultado": f"Hubo un error, por favor asegurate de que los campos esten llenos y de que la funcion sea valida",
                "iteracion": [],
                "grafica": None
            }
