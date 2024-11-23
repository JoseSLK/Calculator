import numpy as np

def trapecio(data):
    """
    Calcula la integral definida de una función `fx` usando la Regla de los Trapecios con tramos equidistantes.
    
    Parámetros:
    data (dict): Un diccionario que contiene la función 'function', los límites 'a' y 'b', y el número de 'tramos'.
    
    Retorna:
    dict: Un resultado que contiene el área calculada y los detalles de cada iteración.
    """
    plt.clf()

    fx = data['function']  # Función para evaluar
    a = data['a']  # Límite inferior de integración
    b = data['b']  # Límite superior de integración
    tramos = data['tramos']  # Número de tramos

    h = (b - a) / tramos
    xi = a
    suma = fx(xi)
    iteration = []

    x_min, x_max = -10, 10
    num_puntos = 1000

    x_vals = np.linspace(x_min, x_max, num_puntos)
    y_vals = [fx(x) for x in x_vals] 

    plt.plot(x_vals, y_vals, label='f(x)', color='blue', linewidth=2)
    plt.xlabel('x')
    plt.ylabel('f(x)')
    plt.title(f'Grafica {fx}')
    plt.legend()
    plt.grid(True) 

    for i in range(1, tramos):
        
        xi += h
        suma += 2 * fx(xi)

        iteration.append({
            "iteracion": i,
            "x": xi,
            "f(xi)": fx(xi)
        })

        plt.fill(
            [xi - h, xi, xi, xi - h],
            [0, 0, fx(xi), fx(xi - h)],
            color='orange',
            alpha=0.3,
            edgecolor='red',
            linewidth=2.5,  # Grosor del borde de los trapecios
            linestyle='-'   # Línea sólida
        )

    suma += fx(b)
    area = h * (suma / 2)

    buf = BytesIO()
    plt.savefig(buf, format='png', dpi=300)
    buf.seek(0)
    img_base64 = base64.b64encode(buf.read()).decode('utf-8')
    buf.close() 
    plt.clf() 

    return {
        "resultado": area,
        "iteracion": iteration,
        "grafica": img_base64
    }


